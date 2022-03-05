/* istanbul ignore file */

import * as express from 'express';
import { Application } from 'express';
import * as basicAuth from 'express-basic-auth';
import { API_ROUTE } from '../../constants';
import APP_CONFIG from '../app.config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_app: Application): void => {
    if (APP_CONFIG.apiDoc.enable === true && (APP_CONFIG.isDev === true || APP_CONFIG.isLocal === true)) {
        _app.use(
            `${API_ROUTE}/${APP_CONFIG.apiDoc.url}`,
            basicAuth({
                users: {
                    [`${APP_CONFIG.apiDoc.username}`]: `${APP_CONFIG.apiDoc.password}`
                },
                challenge: true
            }),
            function (req, res, next) {
                res.setHeader(
                    'Content-Security-Policy',
                    `default-src *; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${APP_CONFIG.base_URL}'`
                );
                return next();
            },
            express.static(APP_CONFIG.apiDoc.path)
        );
    }
};
