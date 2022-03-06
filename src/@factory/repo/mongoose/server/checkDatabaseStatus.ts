import IConfig from '../Config';
import { ServerError } from '../../../../@core/helpers/errors';

export default (config: IConfig) => async (): Promise<boolean | Error | null> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const state = await config.mongooseInstance.then((r) => {
            return Number(r?.connection?.readyState);
        });

        if (state !== 1) throw new ServerError();

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
