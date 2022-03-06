/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import getGeoPlace from './getPlaceInfo';
import getGeoWeatherInfo from './getWeatherInfo';

// eslint-disable-next-line import/prefer-default-export
export default (config: any) => ({
    getGeoPlace: getGeoPlace(config),
    getGeoWeatherInfo: getGeoWeatherInfo(config)
});
