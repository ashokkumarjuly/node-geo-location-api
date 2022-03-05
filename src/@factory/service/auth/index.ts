/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';
import { loginSecret, login, getTokenByRefreshToken } from './auth.service';

// eslint-disable-next-line import/prefer-default-export
export const AuthFacades = (config: IConfig) => ({
    loginSecret: loginSecret(config),
    login: login(config),
    getTokenByRefreshToken: getTokenByRefreshToken(config)
});
