/* istanbul ignore file */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'express';

// eslint-disable-next-line unicorn/import-style
import * as swaggerUi from 'swagger-ui-express';
import * as basicAuth from 'express-basic-auth';
import * as YAML from 'yamljs';
import { API_ROUTE } from '../../constants';
import APP_CONFIG from '../app.config';

export default (_app: Application): void => {
    if (APP_CONFIG.swagger.enable === true && (APP_CONFIG.isDev === true || APP_CONFIG.isLocal === true)) {
        const swaggerDocument = YAML.load(`${APP_CONFIG.swagger.path}`);

        _app.use(
            `${API_ROUTE}/${APP_CONFIG.swagger.url}`,
            basicAuth({
                users: {
                    [`${APP_CONFIG.swagger.username}`]: `${APP_CONFIG.swagger.password}`
                },
                challenge: true
            }),
            function (req: any, res: { setHeader: (arg0: string, arg1: string) => void }, next: () => any) {
                res.setHeader(
                    'Content-Security-Policy',
                    `default-src *; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${APP_CONFIG.base_URL}'`
                );
                return next();
            },
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }
};
