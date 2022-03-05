/* istanbul ignore file */

import IConfig from '../Config';
import { IOptions as ISetRecord } from '../interface/setRecord';

export default (config: IConfig) =>
    async ({ data }: ISetRecord): Promise<boolean> => {
        try {
            const { key, value } = data;
            await Promise.all([config.client.set(key, value)]);

            return true;
        } catch (error) {
            config.logger.error({ fn: 'CacheLayer->setRecord', type: 'Service Error', error });
            return false;
        }
    };
