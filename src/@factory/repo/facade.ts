/* istanbul ignore file */

import Db, { ModelDbInterface } from './Db';

import sequelizeDb from './sequelize/facade';
import mongooseDb from './mongoose/facade';
import sequelizeConnection from './sequelize/models/SequelizeConnection';
import mongooseConnection from './mongoose/models/mongooseConnection';
import * as sequelizeModels from './sequelize/models';
import * as mongooseModels from './mongoose/models';
import logger from '../../logger';

interface IConfig {
    readonly modelDb_ORM_NAME: string;
}

const modelDbFactory = (name: string): ModelDbInterface => {
    switch (name) {
        case 'mongo':
            return mongooseDb({
                mongooseInstance: mongooseConnection,
                models: mongooseModels,
                logger
            });
        default:
        case 'sequelize':
            return sequelizeDb({
                sequelizeInstance: sequelizeConnection,
                models: sequelizeModels,
                logger
            });
    }
};

export default (config: IConfig): Db => ({
    ...modelDbFactory(config.modelDb_ORM_NAME)
});
