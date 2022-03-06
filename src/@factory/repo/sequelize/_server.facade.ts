import IConfig from './Config';

import { checkDatabaseStatus } from './server';

export default (config: IConfig): any => ({
    checkDatabaseStatus: checkDatabaseStatus(config)
});
