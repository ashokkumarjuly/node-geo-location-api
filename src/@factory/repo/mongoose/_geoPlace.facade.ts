import IConfig from './Config';

import createGeoPlace from './geoPlaces/createGeoPlace';
import createGeoWeather from './geoPlaces/createGeoWeather';
import deleteGeoPlace from './geoPlaces/deleteGeoPlace';
import deleteGeoWeather from './geoPlaces/deleteGeoWeather';
import getGeoPlace from './geoPlaces/getGeoPlace';
import getGeoWeatherInfo from './geoPlaces/getGeoWeatherInfo';

export default (config: IConfig): any => ({
    createGeoPlace: createGeoPlace(config),
    getGeoPlace: getGeoPlace(config),
    deleteGeoPlace: deleteGeoPlace(config),
    createGeoWeather: createGeoWeather(config),
    getGeoWeatherInfo: getGeoWeatherInfo(config),
    deleteGeoWeather: deleteGeoWeather(config)
});
