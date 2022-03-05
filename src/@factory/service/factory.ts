import dbFactory from '../repo/factory';
import facade from './facade';
import logger from '../../logger';
import Service from './Service';
import mailFactory from '../mail/factory';
import cacheFactory from '../cache-layer/factory';
import geoCodeFactory from '../geoplaces/factory';

export const db = dbFactory();
export const mail = mailFactory();
export const cacheLayer = cacheFactory();
export const geoPlaces = geoCodeFactory();

export default (): Service =>
    facade({
        db,
        mail,
        cacheLayer,
        logger,
        geoPlaces
    });
