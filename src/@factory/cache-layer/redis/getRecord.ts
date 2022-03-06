/* istanbul ignore file */

import IConfig from '../Config';
import { IOptions as IGetRecord } from '../interface/getRecord';

export default (config: IConfig) =>
    async ({ key }: IGetRecord): Promise<any> => {
        try {
            const [get] = await Promise.all([config.client.get(key)]);
            return JSON.parse(get);
        } catch (error) {
            config.logger.error({
                fn: 'CacheLayer->getRecord',
                type: 'Service Error',
                resp: 'error',
                key,
                error
            });
            return null;
        }
    };
