/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';
import { getGeoPlace, getWeatherByGeoPlace } from './geoplaces.service';

// eslint-disable-next-line import/prefer-default-export
export const GeoPlacesFacades = (config: IConfig) => ({
    getGeoPlace: getGeoPlace(config),
    getWeatherByGeoPlace: getWeatherByGeoPlace(config)
});
