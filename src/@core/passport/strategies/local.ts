/* istanbul ignore file */

import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { Logger } from 'winston';
import { InvalidCredentialsError } from '../../helpers/errors';
import { ComparePassword } from '../../lib';
import { ValidateUserAccountStatus } from '../../utils';
import { LOCAL_STRATEGY } from '../../../constants';

const LocalStrategy = passportLocal.Strategy;

/**
 * Local Strategy Auth
 */

interface IOptions {
    readonly service: any;
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
        passport.use(
            new LocalStrategy(
                { usernameField: LOCAL_STRATEGY.USER_NAME_FIELD, passwordField: LOCAL_STRATEGY.PASSWORD_FIELD },
                async (email: string, password: string, done: CallableFunction): Promise<any> => {
                    const user: any = await this._service.getUserByEmail({ email });

                    await ValidateUserAccountStatus(user);

                    const match: boolean = await ComparePassword(password, user.password);

                    if (!match) throw new InvalidCredentialsError();
                    if (user === null) {
                        done(null, false, {
                            message: 'nvalid auth token, user not found'
                        });
                    } else {
                        done(null, { id: user.id, email: user.email });
                    }
                }
            )
        );
    }
}
