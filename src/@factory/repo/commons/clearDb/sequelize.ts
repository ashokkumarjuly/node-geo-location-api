/* istanbul ignore file */

import IConfig from '../../sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    return config.sequelizeInstance.drop();
};
