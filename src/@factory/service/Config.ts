import { Logger } from 'winston';
import Repo from '../repo/Db';
import Mail from '../mail/Mail';
import CacheLayer from '../cache-layer/CacheLayer';
import GeoPlaces from '../geoplaces/GeoPlaces';

export default interface IConfig {
    // config: any;
    readonly db: Repo;
    readonly logger: Logger;
    readonly mail: Mail;
    readonly cacheLayer: CacheLayer | null;
    readonly geoPlaces: GeoPlaces | null;
}
