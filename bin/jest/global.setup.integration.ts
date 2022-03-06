import APP_CONFIG from '../../src/@core/app.config';
import { truncate } from '../../src/@factory/repo/mongoose/models/mongooseConnection';
import User from '../../src/@factory/repo/mongoose/models/User';
// import sequelizeConnection from '../../src/@factory/models/sequelize/SequelizeConnection';

module.exports = async () => {
    console.log('START >> importing test database');
    if (process.env.NODE_ENV && ['development', 'testing'].indexOf(process.env.NODE_ENV) === 0) {
        throw new Error('Testing is not allowed');
    }

    if (APP_CONFIG.modelDb.DB_ORM_NAME === 'sequelize') {
        const execSync = require('child_process').execSync;
        const dbUser = APP_CONFIG.modelDb.username;
        const dbPass = APP_CONFIG.modelDb.password ? APP_CONFIG.modelDb.password : 'password';
        const dbName = APP_CONFIG.modelDb.database;

        // await sequelizeConnection.query(`CREATE DATABASE IF NOT EXISTS \`${APP_CONFIG.modelDb.sequelize.database}\`;`);

        await execSync(`sh bin/scripts/import_test_db.sh -u ${dbUser} -p ${dbPass} -d ${dbName}`);
        console.log('<< END Finished importing test database in Mysql');
    } else if (APP_CONFIG.modelDb.DB_ORM_NAME === 'mongo') {
        await truncate();
        User.collection.deleteMany({});
        const user = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@mailinator.com',
            password: null,
            role: 1,
            phoneCode: '1',
            phoneNo: '0001101014',
            profile_image: null,
            address: 'south lane 4th street',
            address2: null,
            city: 'New york',
            state: 'NY',
            country_code: 'US',
            zip_code: null,
            profile_completion: 100,
            status: 1,
            email_verified: 1,
            auth_token: null,
            verification_token_expires: null,
            time_zone: null,
            last_login_date: '2022-02-25 10:51:03',
            deleted_at: null,
            created_at: '2019-07-16 10:41:38',
            updated_at: '2022-02-25 10:51:03'
        });
        const u = await user.save();
        console.log('<< END Finished importing test database in Mongo');
    }
};
