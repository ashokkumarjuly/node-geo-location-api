/* istanbul ignore file */

import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import { ICoreConfig } from '../ICoreConfig';
import { EmptyStringsToNull } from '../helpers';
import appConfig from '../app.config';

export const handleCookieParser = (_config: ICoreConfig): void => {
    _config.app.use(cookieParser());
};

export const handleMethodOveride = (_config: ICoreConfig): void => {
    _config.app.use(methodOverride('X-HTTP-Method')); //          Microsoft
    _config.app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
    _config.app.use(methodOverride('X-Method-Override')); //      IBM
};

export const handleBodyRequestParsing = (_config: ICoreConfig): void => {
    _config.app.use(bodyParser.urlencoded({ extended: true }));
    _config.app.use(bodyParser.json());
};

export const handleCompression = (_config: ICoreConfig): void => {
    _config.app.use(compression());
};

export const handleEmptryStringInRequest = (_config: ICoreConfig): void => {
    _config.app.use(EmptyStringsToNull);
};

export const handleHelmet = (_config: ICoreConfig): void => {
    _config.app.use(helmet());
};

export const handleCors = (_config: ICoreConfig): void => {
    if (appConfig.ENABLE_CORS === true) {
        const allowedOrigins = appConfig.ALLOWED_ORIGINS.split(',');

        _config.app.use(
            cors({
                preflightContinue: false,
                origin: (origin, callback) => {
                    console.log(origin);
                    // allow requests with no origin
                    // (like mobile apps or curl requests)
                    if (!origin) return callback(null, true);

                    if (!allowedOrigins.includes(origin)) {
                        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
                        return callback(new Error(msg), false);
                    }
                    return callback(null, true);
                }
            })
        );
    }
};
