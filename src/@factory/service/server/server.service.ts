import { CheckDatabaseStatusSignature } from '../../repo/interfaces';
import IConfig from '../Config';

export const checkDatabaseStatus =
    (config: IConfig): CheckDatabaseStatusSignature =>
    async () => {
        const result = await config.db.checkDatabaseStatus({});

        return result;
    };
