/* istanbul ignore file */

import axios from 'axios';
import IConfig from './Config';
import { IOptions } from '../repo/interfaces/geoplaces/getGeoPlaces';
import { emptyStringsToNull } from '../../helpers/util';
// 'https://nominatim.openstreetmap.org/?addressdetails=1&street=135 pilkington avenue&format=json&limit=1&city=Birmingham&state=England&country=United Kingdom&postalcode=B72 1LH&town=Ataco'

export default (config: IConfig) =>
    // eslint-disable-next-line unicorn/consistent-function-scoping
    async ({ filter, limit, addressdetails }: IOptions): Promise<Array<Record<string, any>> | null> => {
        let params: any = { ...filter, limit, format: 'json', addressdetails };
        config.logger.info({ fn: 'getPlaceInfo', type: 'AxiosRequest', params });

        params = emptyStringsToNull(params);

        return axios
            .get('https://nominatim.openstreetmap.org', { params })
            .then(function (response) {
                if (response?.data && Array.isArray(response?.data)) {
                    return response?.data;
                }
                return null;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    };
