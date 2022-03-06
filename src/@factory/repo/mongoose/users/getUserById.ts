import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/getUserById';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../constants';
import { ModelNotFoundError } from '../../../../@core/helpers/errors';
import { IUserAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async (data: IOptions): Promise<IUserAttributes> => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id, uid, attributes } = data;
        const whereOptions: Record<string, any> = {};

        if (id) {
            whereOptions.id = id;
        } else if (uid) {
            whereOptions.uid = uid;
        }

        if (Object.keys(whereOptions).length === 0) {
            throw new ModelNotFoundError('', { entityName: 'User' });
        }

        const columns = attributes ? [...attributes] : [...USER_MODEL_VISIBLE_PROPERTIES, 'id'];

        const user = await config.models.User.findOne(whereOptions).select(columns?.join(' '));

        if (user === null) throw new ModelNotFoundError('', { entityName: 'User' });

        return user;
    };
