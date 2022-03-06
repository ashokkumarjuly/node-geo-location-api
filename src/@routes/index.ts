/* istanbul ignore file */

import * as express from 'express';
import AppConfig from '../@core/app.config';
import { API_ROUTE, API_ROUTE_V1 } from '../constants';
import { JwtValidateApiRoutes } from '../@core/lib';
import AuthRoute from '../api/auth/route';
import { ICoreConfig } from '../@core/ICoreConfig';
import UserRoutes from '../api/v1/user/route';
import ServerRoutes from '../api/server/route';
import GeoPlacesRoutes from '../api/v1/geoplaces/route';

export const AuthRoutes = (_config: ICoreConfig): void => {
    // To protect all API routes with JWT
    JwtValidateApiRoutes(_config.app);

    // To rate limit Api calls
    // ApiRateLimter(_config.app);

    _config.app.use(`${API_ROUTE}/auth`, new AuthRoute(_config)._router); // Authentication Routes
};

export const PublicRoutes = (_config: ICoreConfig): void => {
    _config.app.use(`${API_ROUTE}/server`, new ServerRoutes(_config)._router); // To check the server health status
    if (AppConfig.isProduction === false) {
        // [TEMPORARY, NOT For PRODUCTION]
        _config.app.use(`${API_ROUTE}/logs/:filename`, (req, res, next) => {
            const { filename } = req.params;
            const filePath = `${AppConfig.logging.winstonDirectory}/${filename}`;

            res.download(filePath, (err) => {
                if (err) {
                    next(err);
                }
            });
        });
    }

    if (AppConfig.testSuite.enable === true && (AppConfig.isLocal === true || AppConfig.isDev === true)) {
        // To View test results
        _config.app.use(`${API_ROUTE}/test/unit`, express.static(`${AppConfig.testSuite.jestStarePath}`));
        _config.app.use(`${API_ROUTE}/test/coverage`, express.static(`${AppConfig.testSuite.coveragePath}`));
    }
};

export const ApiRoutesV1 = (_config: ICoreConfig): void => {
    // To protect all API routes with JWT
    JwtValidateApiRoutes(_config.app);

    _config.app.use(`${API_ROUTE_V1}/users`, new UserRoutes(_config)._router); // User Routes
    _config.app.use(`${API_ROUTE_V1}/places`, new GeoPlacesRoutes(_config)._router); // User Routes

    // ADD New Routes Here ....
};
