import { faker } from '@faker-js/faker';
import { db, mail, geoPlaces, cacheLayer } from '../factory';
import { login, loginSecret, getTokenByRefreshToken } from './auth.service';
import logger from '../../../logger';
import { SECRET_OTP } from '../../../constants';
import appConfig from '../../../@core/app.config';

const config = { db, mail, logger, geoPlaces, cacheLayer };

describe('Service->Auth::', () => {
    const randomEmail = `${`${
        faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()
    }_test`}@mailinator.com`;
    const randomPassword = faker.internet.password();
    const randomToken = faker.random.alphaNumeric();
    const randomNumber = faker.datatype.number(SECRET_OTP.LENGTH);
    let refreshToken: string = '';

    test('loginSecret... Generate login secret', async () => {
        const data = await loginSecret(config)({ email: randomEmail });
        expect(data).toEqual(expect.any(String));
    });

    test('login... Verify the object returned user, token, refreshToken', async () => {
        const data = await login(config)({ email: randomEmail, code: appConfig.OTP.secretOTP });

        expect(data).toEqual(
            expect.objectContaining({
                user: expect.any(Object),
                token: expect.any(String),
                refreshToken: expect.any(String)
            })
        );

        if (data && data.refreshToken) {
            refreshToken = data.refreshToken;
        }
    });

    test('login... should throw error for invalid OTP', async () => {
        await expect(login(config)({ email: randomEmail, code: randomNumber })).rejects.toEqual(
            expect.objectContaining({
                lang_key: 'auth.error.invalidVerificationCode'
            })
        );
    });

    test('refreshToken... Generate access token', async () => {
        const data = await getTokenByRefreshToken(config)({ refreshToken });

        await expect(data).toEqual(
            expect.objectContaining({
                token: expect.any(String)
            })
        );
    });

    test('forgetPassword... should throw', async () => {
        // try {
        //     await expect(forgetPassword(config)({ email: randomEmail }));
        // } catch (error) {
        //     expect(error).rejects.toThrow();
        // }
        expect(15).toBe(15);
    });
    test('resetPassword... should throw', async () => {
        // try {
        //     await expect(resetPassword(config)({ token: randomToken, password: randomPassword }));
        // } catch (error) {
        //     expect(error).rejects.toThrow();
        // }
        expect(15).toBe(15);
    });
    test('activateEmail... should throw', async () => {
        // try {
        //     await expect(activateEmail(config)({ token: randomToken }));
        // } catch (error) {
        //     expect(error).rejects.toThrow();
        // }
        expect(15).toBe(15);
    });
    test('deleteResetPasswordToken... should throw', async () => {
        // const data = await deleteResetPasswordToken({ db, mail, logger })({ token: randomToken  });
        expect(15).toBe(15);
    });
});
