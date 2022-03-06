import APP_CONFIG from '../../src/@core/app.config';
// import sequelizeConnection from '../../src/@factory/models/sequelize/SequelizeConnection';
import { disconnect } from '../../src/@factory/repo/mongoose/models/mongooseConnection';

module.exports = async () => {
    if (process.env.NODE_ENV && ['development', 'testing'].indexOf(process.env.NODE_ENV) === 0) {
        throw new Error('Testing is not allowed');
    }
    // UnComment this later
    // await sequelizeConnection.query(`DROP DATABASE IF EXISTS \`${APP_CONFIG.modelDb.sequelize.database}\`;`);

    await disconnect();

    console.log('<< END Finished......');
    process.exit(0);
};
