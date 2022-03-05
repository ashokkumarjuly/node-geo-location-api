/* istanbul ignore file */

import { Response, NextFunction, Application } from 'express';

import * as expressSession from 'express-session';
import createMemoryStore = require('memorystore');
import appConfig from '../app.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const MemoryStore = require('memorystore')(expressSession);
const MemoryStore = createMemoryStore(expressSession);
const sessionConfig: any = {
    secret: appConfig.jwt.secretAccessToken,
    resave: true,
    saveUninitialized: true
};

if (!['local', 'testing'].includes(appConfig.env)) {
    sessionConfig.store = new MemoryStore({
        checkPeriod: 86_400_000 // prune expired entries every 24h
    });
}

export default (_app: Application): void => {
    sessionConfig.cookie =
        appConfig.ENABLE_HTTPS === true ? { secure: true } : { secure: false, maxAge: 4 * 60 * 60 * 1000 };

    _app.use(expressSession(sessionConfig));

    _app.use((req, res: Response, next: NextFunction) => {
        res.header('Access-Control-Expose-Headers', 'app-version');
        res.header('app-release-version', appConfig.API_RELEASE_VERSION);
        res.header('api_build_version', appConfig.API_BUILD_VERSION);
        next();
    });
};
