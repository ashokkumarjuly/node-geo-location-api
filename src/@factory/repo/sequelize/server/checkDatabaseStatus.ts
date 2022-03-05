import IConfig from '../Config';
import { ServerError } from '../../../../@core/helpers/errors';

export default (config: IConfig) => async (): Promise<boolean | Error | null> => {
    // eslint-disable-next-line no-useless-catch
    try {
        await config.sequelizeInstance
            .authenticate()
            .then(() => {
                config.logger.info({
                    type: '',
                    fn: 'checkDatabaseStatus',
                    message: 'Connection has been established successfully.'
                });
            })
            .catch((error) => {
                config.logger.error({
                    type: '',
                    fn: 'checkDatabaseStatus',
                    message: 'Unable to connect to the database',
                    error
                });
                throw new ServerError();
            });
        return true;
    } catch (error) {
        config.logger.error({
            type: 'Repo Output',
            fn: 'checkDatabaseStatus',
            message: 'Unable to connect to the database',
            error
        });
        throw error;
    }
};
