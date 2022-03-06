import mongoose from 'mongoose';
import { ServerError } from '../../../../@core/helpers/errors';
import appConfig from '../../../../@core/app.config';

/**
 * Method for connecting to mongoDB
 **/

let conn: Promise<typeof mongoose>;

function mongoConnection() {
    const { username, password, database, port, host, DB_LOG_QUERY } = appConfig.modelDb;
    const connString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

    if (!conn || mongoose.connection.readyState === 0) {
        conn = mongoose.connect(connString);
    }
    if (DB_LOG_QUERY === true) {
        mongoose.set('debug', { shell: true });
    }

    return conn;
}

export default mongoConnection();

export const disconnect = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
};

export const truncate = async () => {
    let promises: any = [];

    await mongoConnection().then((r) => {
        const state = Number(r?.connection?.readyState || 0);

        if (state !== 1) throw new ServerError();
        if (state && r.connection.collections) {
            promises = Object.keys(r.connection.collections).map((collection) =>
                r.connection.collection(collection).deleteMany({})
            );
        }
    });
    await Promise.all(promises);
};
