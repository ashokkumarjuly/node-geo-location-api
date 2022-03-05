/* istanbul ignore file */

import axios from 'axios';
import IConfig from './Config';
import { IOptions } from '../repo/interfaces/geoplaces/getWeatherByGeoAddress';
import { emptyStringsToNull } from '../../helpers/util';
// http://www.7timer.info/bin/api.pl?lon=-1.8164308339635031&lat=52.5487921&product=astro&output=json

export default (config: IConfig) =>
    // eslint-disable-next-line unicorn/consistent-function-scoping
    async ({ product, lat, lon }: IOptions): Promise<Array<Record<string, any>> | null> => {
        let params: any = { product, lat, lon, output: 'json' };
        config.logger.info({ fn: 'getWeatherInfo', type: 'AxiosRequest', params });
        params = emptyStringsToNull(params);

        return axios
            .get('http://www.7timer.info/bin/api.pl', { params })
            .then(function (response) {
                return response?.data || null;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    };
