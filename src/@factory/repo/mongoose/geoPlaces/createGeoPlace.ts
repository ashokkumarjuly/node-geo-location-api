import { UniqueConstraintError } from 'sequelize';
import IConfig from '../Config';
import { IOptions } from '../../interfaces/geoplaces/createPlace';
import { RecordAlreadyExistsError } from '../../../../@core/helpers/errors';
import { IGeoPlaceAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({
        product,
        addressdetails,
        street,
        town,
        postalcode,
        country,
        infoMeta,
        city,
        state,
        lat,
        lon
    }: IOptions): Promise<IGeoPlaceAttributes> => {
        try {
            const dbInput: IGeoPlaceAttributes = {
                product,
                addressdetails,
                street,
                town,
                postalcode,
                country,
                infoMeta,
                city,
                state,
                lat,
                lon
            };

            const address = new config.models.GeoPlace(dbInput);
            await address.save();

            return address;
        } catch (error) {
            // always rollback

            if (error instanceof UniqueConstraintError) {
                throw new RecordAlreadyExistsError();
            }
            throw error;
        }
    };
