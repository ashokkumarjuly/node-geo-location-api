import { Sequelize } from 'sequelize';
import { Logger } from 'winston';
import { IModels } from './models';

export default interface IConfig {
    readonly sequelizeInstance: Sequelize;
    readonly models: IModels;
    readonly logger: Logger;
}
