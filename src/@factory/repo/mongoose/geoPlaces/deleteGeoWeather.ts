import IConfig from '../Config';
import { IOptions } from '../../interfaces/geoplaces/deletePlace';

export default (config: IConfig) =>
    async ({ _id }: IOptions): Promise<boolean> => {
        const result = await config.models.GeoWeather.deleteOne({ _id });

        return result?.deletedCount > 0 ? true : false;
    };
