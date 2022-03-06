/* istanbul ignore file */

import IConfig from '../../sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    await Promise.resolve(config.sequelizeInstance.sync());
};
