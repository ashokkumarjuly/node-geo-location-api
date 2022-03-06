/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';
import { checkDatabaseStatus } from './server.service';

// eslint-disable-next-line import/prefer-default-export
export const ServerFacades = (config: IConfig) => ({
    checkDatabaseStatus: checkDatabaseStatus(config)
});
