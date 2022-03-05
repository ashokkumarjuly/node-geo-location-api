/* istanbul ignore file */

import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import APP_CONFIG from '../app.config';
import { AUTH_SCHEME_NAME } from '../../constants';
import { IJwtPayload } from '../app.config/interface';

export default ({ data, expiresIn }: IJwtPayload): Promise<string> => {
    return new Promise((resolve, reject) => {
        const tokenExpiresIn: string | number = expiresIn || APP_CONFIG.jwt.accessTokenExpiresIn;

        jwt.sign(
            { data, jti: v4() },
            APP_CONFIG.jwt.secretAccessToken,
            { algorithm: APP_CONFIG.jwt.algoritm, expiresIn: tokenExpiresIn },
            (err, token) => {
                if (err) reject(err);
                resolve(`${AUTH_SCHEME_NAME} ${token}`);
            }
        );
    });
};
