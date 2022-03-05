import mongoose from 'mongoose';
import appConfig from '../../../../@core/app.config';

/**
 * Method for connecting to mongoDB
 **/

function mongoConnection() {
    const { username, password, database, port, host, DB_LOG_QUERY } = appConfig.modelDb;
    const connString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

    const conn = mongoose.createConnection(connString);

    if (DB_LOG_QUERY === true) {
        mongoose.set('debug', { shell: true });
    }

    return conn;
}

export default mongoConnection();
