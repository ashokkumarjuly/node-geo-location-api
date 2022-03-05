import appConfig from '../../@core/app.config';
import logger from '../../logger';
import CacheLayer from './CacheLayer';
import redisClient from './redis/config';
import redisInstance from './redis/facade';

interface IConfig {
    readonly cacheName: string;
}

const cacheFactory = (name: string): CacheLayer => {
    switch (name) {
        default:
        case 'redis':
            return redisInstance({
                client: redisClient({ logger }).createClient(appConfig.cachingLibrary.clientUrl),
                logger
            });
    }
};

export default (config: IConfig): CacheLayer | null => {
    if (appConfig.cachingLibrary.enable !== true) {
        return null;
    }
    return {
        ...cacheFactory(config.cacheName)
    };
};
