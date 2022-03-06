import { UniqueConstraintError } from 'sequelize';
import IConfig from '../Config';
import { IOptions } from '../../interfaces/geoplaces/createGeoWeather';
import { RecordAlreadyExistsError } from '../../../../@core/helpers/errors';
import { IGeoWeatherAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ product, lat, lon, infoMeta }: IOptions): Promise<IGeoWeatherAttributes> => {
        try {
            const dbInput: IGeoWeatherAttributes = {
                product,
                lat,
                lon,
                infoMeta
            };

            const weather = new config.models.GeoWeather(dbInput);
            await weather.save();

            return weather;
        } catch (error) {
            // always rollback

            if (error instanceof UniqueConstraintError) {
                throw new RecordAlreadyExistsError();
            }
            throw error;
        }
    };
