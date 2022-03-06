import { Sequelize } from 'sequelize';
import APP_CONFIG from '../../../../@core/app.config';

// Establish Sequelize connection
const { database, username, password, host, port, sequelize } = APP_CONFIG.modelDb;
const { connectionOptions } = sequelize;
const sequelizeConnection: Sequelize = new Sequelize(database, username, password, {
    ...connectionOptions,
    host,
    port
});

export default sequelizeConnection;
