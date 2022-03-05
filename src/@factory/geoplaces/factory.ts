import logger from '../../logger';
import facade from './facade';
import GeoPlaces from './GeoPlaces';

export default (): GeoPlaces | null =>
    facade({
        logger
    });
