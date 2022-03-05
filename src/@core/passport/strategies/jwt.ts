/* istanbul ignore file */

import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { Logger } from 'winston';
import { IJwtPayload } from '../../app.config/interface';
import Service from '../../../@factory/service/Service';
import APP_CONFIG from '../../app.config';
import { IUserAttributes } from '../../../@factory/repo/interfaces';
import { ValidateUserAccountStatus } from '../../utils';

/**
 * Local Strategy Auth
 */

interface IOptions {
    readonly service: Service;
    readonly logger: Logger;
}

export default class {
    public _service: any;

    public _logger: Logger;

    constructor(options: IOptions) {
        this._service = options.service;
        this._logger = options.logger;
    }

    public _init(): void {
        const jwtOpts = {
            // Telling Passport to check authorization headers for JWT

            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromUrlQueryParameter('access_token'),
                ExtractJwt.fromBodyField('access_token'),
                ExtractJwt.fromAuthHeaderWithScheme('JWT')
            ]),
            // Telling Passport where to find the secret
            secretOrKey: APP_CONFIG.jwt.secretAccessToken,
            passReqToCallback: true
        };

        passport.use(
            new JWTStrategy(jwtOpts, async (req: Request, payload: IJwtPayload, done: any) => {
                const { data } = payload;

                try {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const { id, uid } = data;

                    const user: IUserAttributes = await this._service.getUserById({
                        id,
                        uid,
                        attributes: ['id', 'uid', 'email'],
                        isRoles: true
                    });

                    await ValidateUserAccountStatus(user);

                    if (user) {
                        // Send User Info to append in request Objects
                        return done(null, {
                            id: user.id,
                            user_id: user.id,
                            uid: user.uid,
                            role: user.role,
                            email: user.email
                        });
                    }
                    return done(null, false);
                } catch (error) {
                    this._logger.error(JSON.stringify(error));
                    return done(null, false, { message: 'User not found' });
                }
            })
        );
    }
}
