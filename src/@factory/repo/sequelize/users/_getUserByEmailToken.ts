import * as moment from 'moment';
import { Op } from 'sequelize';
import IConfig from '../Config';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../../constants';
import { NotFoundError } from '../../../../@core/helpers/errors';
import { IUserAttributes } from '../../interfaces';
import { DateFormat } from '../../../../helpers/dateFormat';

export default (config: IConfig) =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async ({ token }: any): Promise<IUserAttributes> => {
        const user = await config.models.User.findOne({
            where: {
                authToken: token,
                verificationTokenExpires: {
                    [Op.gt]: moment().utc().format(DateFormat.FORMAT_TWO)
                }
            },
            attributes: USER_MODEL_VISIBLE_PROPERTIES
        });
        if (user === null) throw new NotFoundError('Verification Token Expired.');

        return user.get({ plain: true });
    };
