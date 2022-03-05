/* istanbul ignore file */

import IConfig from '../Config';
import { IOptions as ISetRecord } from '../interface/setRecord';

export default (config: IConfig) =>
    async ({ data }: ISetRecord): Promise<boolean> => {
        try {
            const { key, value, expirationTime } = data;
            await Promise.all([config.client.setex(key, expirationTime, value)]);

            return true;
        } catch (error) {
            config.logger.error({ fn: 'CacheLayer->setRecordWithExpiration', type: 'Service Error', error });
            return false;
        }
    };
