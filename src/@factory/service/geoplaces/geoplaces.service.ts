import { IGetGeoAddressSignature } from '../../repo/interfaces/geoplaces';
import { IOptions } from '../../repo/interfaces/geoplaces/getGeoAddress';
import { IOptions as IWeatherOptions } from '../../repo/interfaces/geoplaces/getWeatherByGeoAddress';
import IConfig from '../Config';

export const getGeoAddress =
    (config: IConfig): IGetGeoAddressSignature =>
    async ({ filter, limit, addressdetails }: IOptions) => {
        const result = await config.geoPlaces?.getGeoAddress({
            filter,
            addressdetails,
            limit: limit || 1
        });

        return result || null;
    };

export const getWeatherByGeoAddress =
    (config: IConfig): IGetGeoAddressSignature =>
    async ({ filter, limit, product, addressdetails }: IOptions) => {
        const addressInfo = await config.geoPlaces?.getGeoAddress({
            filter,
            addressdetails,
            limit: limit || 1
        });

        if (addressInfo && addressInfo.length > 0) {
            const payload: any = {};

            if (addressInfo[0].lat) {
                payload.lat = addressInfo[0].lat;
            }
            if (addressInfo[0].lat) {
                payload.lon = addressInfo[0].lon;
            }
            payload.product = product;

            const result = await config.geoPlaces?.getGeoWeatherInfo(payload as IWeatherOptions);

            return result || null;
        }

        return null;
    };
