import facade from './facade';
import CacheLayer from './CacheLayer';

export default (): CacheLayer | null =>
    facade({
        cacheName: 'redis'
    });
