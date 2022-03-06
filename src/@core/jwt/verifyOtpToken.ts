/* istanbul ignore file */

import * as jwt from 'jsonwebtoken';
import APP_CONFIG from '../app.config';
import { CustomError } from '../helpers/errors';

interface IOptions {
    readonly token: string;
    readonly secretOrKey?: string | Buffer;
    readonly code?: number;
    readonly validateIsFalse?: boolean;
}

export default async ({
    token,
    code,
    secretOrKey,
    validateIsFalse
}: IOptions): Promise<boolean | void | Error | Record<string, any>> => {
    try {
        const secret = secretOrKey || APP_CONFIG.jwt.secretAccessToken;
        const { data }: any = jwt.verify(token, secret);

        if (validateIsFalse) {
            return data;
        }
        if (code && data.otp === code) {
            return await Promise.resolve();
        }

        throw new CustomError('auth.error.invalidVerificationCode');
    } catch (error) {
        if (validateIsFalse) return;
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.NotBeforeError ||
            error instanceof jwt.TokenExpiredError
        ) {
            throw new CustomError('auth.error.invalidVerificationCode');
        }
        throw error;
    }
};
