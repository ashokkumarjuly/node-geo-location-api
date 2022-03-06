import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/getUserByEmail';
import { ModelNotFoundError } from '../../../../@core/helpers/errors';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../constants';
import { IUserAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ email, attributes }: IOptions): Promise<IUserAttributes | null> => {
        const columns = attributes ? [...attributes] : [...USER_MODEL_VISIBLE_PROPERTIES, 'id'];

        const user = await config.models.User.findOne({ email }).select(columns.join(' '));

        if (user === null) throw new ModelNotFoundError('', { entityName: 'User' });

        const result = user;

        return result;
    };
