/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import getGeoAddress from './getAddressInfo';
import getGeoWeatherInfo from './getWeatherInfo';

// eslint-disable-next-line import/prefer-default-export
export default (config: any) => ({
    getGeoAddress: getGeoAddress(config),
    getGeoWeatherInfo: getGeoWeatherInfo(config)
});
