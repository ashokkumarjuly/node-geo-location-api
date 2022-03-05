import IConfig from './Config';
import { ModelDbInterface } from '../Db';
import migrate from '../commons/migrate/sequelize';
import rollback from '../commons/rollback/sequelize';
import clearDb from '../commons/clearDb/sequelize';
import getTransaction from '../commons/getTransaction/sequelize';
import UserFacade from './_user.facade';
import ServerFacade from './_server.facade';

export default (config: IConfig): ModelDbInterface => ({
    ...UserFacade(config),
    ...ServerFacade(config),

    clearDb: clearDb(config),
    migrate: migrate(config),
    rollback: rollback(config),
    getTransaction: getTransaction(config)
});
