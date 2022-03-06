/* istanbul ignore file */

import { Response, NextFunction, Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import { APP_PATHS, API_ROUTE_V1 } from '../../constants';
import { IRequestUser } from '../app.config/interface';
import { JwtAuthenticate } from '../passport/authenticate';

/**
  To protect all API routes with JWT
*/
export default (_app: Application): void => {
    _app.use(`${API_ROUTE_V1}/*`, (req, res: Response, next: NextFunction) => {
        if (APP_PATHS.JWT_EXCLUDED.some((a) => req.baseUrl.includes(a))) {
            return next();
        }

        return JwtAuthenticate((err: Error, user: IRequestUser, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                if (info.name === 'TokenExpiredError') {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        message: 'Your token has expired. Please generate a new one'
                    });
                }

                return res.status(StatusCodes.UNAUTHORIZED).json({ message: info.message });
            }
            // Append User Info to request Objects
            req.user = user;

            return next();
        })(req, res, next);
    });
};
