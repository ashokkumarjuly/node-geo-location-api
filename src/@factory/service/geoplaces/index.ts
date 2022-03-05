/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';
import { getGeoAddress, getWeatherByGeoAddress } from './geoplaces.service';

// eslint-disable-next-line import/prefer-default-export
export const GeoPlacesFacades = (config: IConfig) => ({
    getGeoAddress: getGeoAddress(config),
    getWeatherByGeoAddress: getWeatherByGeoAddress(config)
});
