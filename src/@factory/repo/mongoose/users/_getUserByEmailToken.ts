import * as moment from 'moment';
import { Op } from 'sequelize';
import IConfig from '../Config';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../constants';
import { NotFoundError } from '../../../../@core/helpers/errors';
import { IUserAttributes } from '../../interfaces';
import { DateFormat } from '../../../../helpers/dateFormat';

export default (config: IConfig) =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async ({ token, attributes }: any): Promise<IUserAttributes> => {
        const columns = attributes ? [...attributes] : [...USER_MODEL_VISIBLE_PROPERTIES];
        const user = await config.models.User.findOne({
            authToken: token,
            verificationTokenExpires: {
                [Op.gt]: moment().utc().format(DateFormat.FORMAT_TWO)
            }
        }).select(columns.join(' '));

        if (user === null) throw new NotFoundError('Verification Token Expired.');

        return user;
    };
