import IConfig from '../Config';
import { IOptions } from '../../interfaces/geoplaces/getPlacesByAddress';
import { IGeoPlaceAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ attributes }: IOptions): Promise<IGeoPlaceAttributes | null> => {
        const result = await config.models.GeoPlace.findOne(attributes);

        // if (result === null) throw new ModelNotFoundError('', { entityName: 'GeoAddress' });

        return result || null;
    };
