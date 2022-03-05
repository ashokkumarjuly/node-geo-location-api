import { UniqueConstraintError } from 'sequelize';
import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/createUser';
import hashPassword from '../../../../lib/hashPassword';
import { APP_ROLES } from '../../../../constants';
import { RecordAlreadyExistsError } from '../../../../@core/helpers/errors';
import { IUserAttributes } from '../../interfaces/user';

export default (config: IConfig) =>
    async ({
        firstName,
        lastName,
        email,
        password,
        role,
        address,
        address2,
        city,
        state,
        zipCode,
        countryCode,
        phoneNo,
        phoneCode
    }: IOptions): Promise<IUserAttributes> => {
        const transaction = await config.sequelizeInstance.transaction();
        try {
            const dbInput: IUserAttributes = {
                firstName,
                lastName,
                email,
                password,
                role,
                address,
                address2,
                city,
                state,
                zipCode,
                countryCode,
                phoneNo
            };
            let userRoleId = role;
            if (phoneCode) {
                dbInput.phoneCode = phoneCode;
            }
            if (password) {
                dbInput.password = await hashPassword(password);
            }

            if (!userRoleId) {
                userRoleId = APP_ROLES.USER.id;
            }
            const user = await config.models.User.create({ ...dbInput, role: userRoleId }, { transaction });

            await transaction.commit();

            return user.get({ plain: true });
        } catch (error) {
            // always rollback
            await transaction.rollback();

            if (error instanceof UniqueConstraintError) {
                throw new RecordAlreadyExistsError();
            }
            throw error;
        }
    };
