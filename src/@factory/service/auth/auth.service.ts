import * as moment from 'moment';
import IConfig from '../Config';
import { AUTH_SCHEME_NAME, APP_ROLES, USER_STATUS, SECRET_OTP } from '../../../constants';
import APP_CONFIG from '../../../@core/app.config';
import { IUserAttributes, ILoginSecretSignature, ILoginSignature, IRefreshTokenSignature } from '../../repo/interfaces';
import generateToken from '../../../@core/jwt/generateToken';
import verifyOtpToken from '../../../@core/jwt/verifyOtpToken';
import verifyRefreshToken from '../../../@core/jwt/verifyRefreshToken';
import { ModelNotFoundError, CustomError } from '../../../@core/helpers/errors';
import { ValidateIsActiveUserAccount } from '../../../@core/utils';
import { generateRandomDigits } from '../../../lib';
import { sendLoginSecretEmail } from './auth.mail';
import { sec2time } from '../../../helpers/util';
import { DateFormat } from '../../../helpers/dateFormat';

export const loginSecret =
    (config: IConfig): ILoginSecretSignature =>
    async ({ email }) => {
        try {
            let user: any;
            let otp = 111;
            const isMaxUse = Math.abs(APP_CONFIG.OTP.secretOTPMaxReuse);
            const expiresIn = sec2time(APP_CONFIG.OTP.secretOTPExpiresIn);
            let token = null;

            try {
                user = await config.db.getUserByEmail({ email, attributes: ['verificationTokenExpires'] });
            } catch (error) {
                if (!(error instanceof ModelNotFoundError)) {
                    throw error;
                }
            }

            if (!user) {
                const newRecord = await config.db.createUser({
                    email,
                    role: APP_ROLES.USER.id
                });

                if (newRecord) {
                    user = await config.db.getUserByEmail({ email, attributes: ['verificationTokenExpires'] });
                }
            }

            const expiredSeconds = user?.verificationTokenExpires
                ? moment(user.verificationTokenExpires).diff(moment().format(DateFormat.FORMAT_TWO), 'seconds')
                : 0;

            if (
                expiredSeconds &&
                expiredSeconds > 0 &&
                Math.abs(expiredSeconds) < Math.abs(APP_CONFIG.OTP.secretOTPExpiresIn)
            ) {
                throw new CustomError('auth.error.resendCodeAfter', {
                    time: `${sec2time(expiredSeconds)}`
                });
            }

            const jwtHash: any = await verifyOtpToken({ token: user.authToken, validateIsFalse: true });
            const currentTime = moment().utc().valueOf();
            let reissueUntil = moment(currentTime).utc().add(isMaxUse, 'seconds').valueOf();

            if (jwtHash?.otp && jwtHash?.reissueUntil > 0 && jwtHash?.reissueUntil > currentTime) {
                otp = jwtHash.otp;
                reissueUntil = jwtHash.reissueUntil;
            } else {
                otp = Number(generateRandomDigits({ length: SECRET_OTP.LENGTH, dictionary: 'number' }));

                const tokenInfo: string = await generateToken({
                    data: {
                        otp,
                        reissueUntil
                    }
                });
                token = tokenInfo.replace(`${AUTH_SCHEME_NAME} `, '');
            }

            const dbUpdate: any = {
                verificationTokenExpires: moment()
                    .add(APP_CONFIG.OTP.secretOTPExpiresIn, 'seconds')
                    .format(DateFormat.FORMAT_TWO)
            };

            if (token) {
                dbUpdate.authToken = token;
            }

            await config.db.updateUser({ uid: user.uid, data: dbUpdate });

            await sendLoginSecretEmail(config, {
                email,
                data: {
                    otp,
                    base_url: APP_CONFIG.base_URL,
                    expiresIn: `${moment.utc(reissueUntil).format(DateFormat.FORMAT_THREE)} (UTC)`
                }
            });

            return expiresIn;
        } catch (error) {
            config.logger.error({ fn: 'login', type: 'Service Error', error });

            throw error;
        }
    };

export const login =
    (config: IConfig): ILoginSignature =>
    async ({ email, code }) => {
        try {
            const userRow: IUserAttributes = await config.db.getUserByEmail({ email });

            await ValidateIsActiveUserAccount(userRow);

            // TBD OTP bypassed on local and dev environment
            let bypassOtpCheck = false;

            if (
                (APP_CONFIG.isLocal === true ||
                    APP_CONFIG.isDev === true ||
                    APP_CONFIG.isTest === true ||
                    APP_CONFIG.isQA === true) &&
                String(code) === String(APP_CONFIG.OTP.secretOTP)
            ) {
                bypassOtpCheck = true;
            } else if (userRow.authToken) {
                if (!bypassOtpCheck) {
                    await verifyOtpToken({ token: userRow.authToken, code: +code });
                }
            } else if (!bypassOtpCheck) {
                throw new CustomError('auth.error.invalidVerificationCode');
            }

            const updateUserData: IUserAttributes = {
                authToken: null,
                verificationTokenExpires: null,
                lastLoginDate: moment().format(DateFormat.FORMAT_TWO)
            };

            if (!userRow.emailVerified) {
                updateUserData.emailVerified = 1;
            }

            if (userRow.status === USER_STATUS.PENDING) {
                updateUserData.status = USER_STATUS.ACTIVE;
            }

            const data = { uid: '' };
            data.uid = userRow?.uid ? userRow.uid : data.uid;

            const token: string = await generateToken({ data, expiresIn: APP_CONFIG.jwt.accessTokenExpiresIn });
            const refreshToken: string = await generateToken({
                data,
                expiresIn: APP_CONFIG.jwt.secretRefreshTokenExpiresIn
            });

            await config.db.updateUser({ uid: `${userRow.uid}`, data: updateUserData });

            const user: IUserAttributes = await config.db.getUserById({ uid: data.uid });

            delete user.password;
            delete user.authToken;
            delete user.id;

            return { user, token, refreshToken };
        } catch (error) {
            config.logger.error({ fn: 'verifyLoginOtp', type: 'Service Error', error, email, code });

            throw error;
        }
    };

export const getTokenByRefreshToken =
    (config: IConfig): IRefreshTokenSignature =>
    async ({ refreshToken }) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const userUID: string = await verifyRefreshToken({ refreshToken });
            const userRow: IUserAttributes = await config.db.getUserById({ uid: userUID });

            await ValidateIsActiveUserAccount(userRow);

            const data = { uid: '' };
            data.uid = userRow?.uid ? userRow.uid : data.uid;

            const token: string = await generateToken({ data, expiresIn: APP_CONFIG.OTP.secretOTPExpiresIn });

            return { token };
        } catch (error) {
            config.logger.error({ fn: 'getTokenByRefreshToken', type: 'Service Error', error });
            throw error;
        }
    };
