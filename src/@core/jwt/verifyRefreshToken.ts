/* istanbul ignore file */

import * as jwt from 'jsonwebtoken';
import APP_CONFIG from '../app.config';
import { ExpiredJwtTokenError } from '../helpers/errors';
import { AUTH_SCHEME_NAME } from '../../constants';

interface IOptions {
    readonly refreshToken: string;
    readonly secretOrKey?: string | Buffer;
}

export default async (options: IOptions): Promise<string> => {
    try {
        const secret = options.secretOrKey || APP_CONFIG.jwt.secretAccessToken;
        // eslint-disable-next-line func-names
        const tokenArray = options.refreshToken.split(AUTH_SCHEME_NAME).map(function (item) {
            return item.trim();
        });
        const token = tokenArray.length > 0 && tokenArray[1] ? tokenArray[1] : '';
        const { data }: any = jwt.verify(token, secret);

        if (data.uid) {
            return data.uid;
        }

        throw new ExpiredJwtTokenError();
    } catch (error) {
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.NotBeforeError ||
            error instanceof jwt.TokenExpiredError
        ) {
            throw new ExpiredJwtTokenError();
        }
        throw error;
    }
};
