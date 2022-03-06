/* eslint-disable @typescript-eslint/naming-convention */
import * as moment from 'moment';
import { CustomError } from '../../../@core/helpers/errors';
import { TIME_OUT } from '../../../constants';
import { DateFormat } from '../../../helpers/dateFormat';
import { IGetGeoPlaceSignature } from '../../repo/interfaces/geoplaces';
import { IOptions } from '../../repo/interfaces/geoplaces/getGeoPlaces';
import { IOptions as IWeatherOptions } from '../../repo/interfaces/geoplaces/getWeatherByGeoPlace';
import IConfig from '../Config';

const isCacheExpired = ({ createdAt }: { createdAt: string | Date | undefined }) => {
    if (!createdAt) {
        return true;
    }
    const expiredSeconds = createdAt ? moment().diff(moment(createdAt).format(DateFormat.FORMAT_TWO), 'seconds') : 0;

    return TIME_OUT.CACHE_EXPIRY_MAX < expiredSeconds;
};

const _fetchAndSavePlace =
    (config: IConfig) =>
    async ({ filter, addressdetails }: IOptions) => {
        // Get record from Place API
        const result = await config.geoPlaces?.getGeoPlace({ filter, addressdetails, limit: 1 });

        if (result === null || !Array.isArray(result) || result.length === 0)
            throw new CustomError('geoPlace.error.invalidAddress');

        const payload: any = {
            ...filter,
            addressdetails,
            infoMeta: JSON.stringify(result[0]),
            lat: result[0]?.lat || 0,
            lon: result[0]?.lon || 0
        };

        // Insert into table for caching
        await config.db.createGeoPlace(payload);

        return result[0];
    };

const _fetchPlace =
    (config: IConfig) =>
    async ({ filter, addressdetails }: IOptions) => {
        const ex = await config.db.getGeoPlace({ attributes: Object.assign({}, filter, addressdetails) });

        if (ex && ex._id && ex.infoMeta) {
            const isExpired = isCacheExpired({ createdAt: ex?.createdAt });
            if (!isExpired) return JSON.parse(ex.infoMeta);
            if (isExpired) await config.db.deleteGeoPlace({ _id: ex._id });
        }

        // Get record from Place API
        return _fetchAndSavePlace(config)({ filter, addressdetails });
    };

/**
 * To verify if the address is valid
 * @param config
 * @returns
 */
export const getGeoPlace =
    (config: IConfig): IGetGeoPlaceSignature =>
    async ({ filter, addressdetails }: IOptions) => {
        // Get record from Place API
        return _fetchPlace(config)({ filter, addressdetails });
    };

/**
 * To fetch weather information by address
 * @param config
 * @returns
 */
export const getWeatherByGeoPlace =
    (config: IConfig): IGetGeoPlaceSignature =>
    async ({ filter, product, addressdetails }: IOptions) => {
        // To Fetch address information
        const placeObj = await _fetchPlace(config)({ filter, addressdetails });

        const payload: any = { product, lat: placeObj.lat, lon: placeObj.lon };

        // Fetch lat and lon from database to populate weather info
        const weatherInfo = await config.db.getGeoWeatherInfo({ ...payload });

        if (weatherInfo && weatherInfo._id) {
            const isWeatherExpired = isCacheExpired({ createdAt: weatherInfo?.createdAt });
            if (!isWeatherExpired) return JSON.parse(weatherInfo.infoMeta);
            if (isWeatherExpired) await config.db.deleteGeoWeather({ _id: weatherInfo._id });
        }

        // Fetch weather info by lat and long from Weather API
        const result = await config.geoPlaces?.getGeoWeatherInfo(payload as IWeatherOptions);

        if (result === null) throw new CustomError('geoPlace.error.invalidAddress');

        await config.db.createGeoWeather({
            product: product as string,
            lat: payload.lat,
            lon: payload.lon,
            infoMeta: JSON.stringify(result)
        });

        return result;
    };
