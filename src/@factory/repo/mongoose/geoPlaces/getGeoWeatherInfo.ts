import IConfig from '../Config';
import { IOptions } from '../../interfaces/geoplaces/getPlacesByAddress';
import { IGeoWeatherAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ attributes }: IOptions): Promise<IGeoWeatherAttributes | null> => {
        const result = await config.models.GeoWeather.findOne(attributes);

        // if (result === null) throw new ModelNotFoundError('', { entityName: 'GeoAddress' });

        return result || null;
    };
