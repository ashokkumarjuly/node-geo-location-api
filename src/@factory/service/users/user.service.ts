import { ValidateUserAccountStatus } from '../../../@core/utils';
import { APP_ROLES, USER_STATUS } from '../../../constants';
import { CustomError, ForbiddenError } from '../../../@core/helpers/errors';
import IConfig from '../Config';
import {
    ICreateUserSignature,
    IGetUserByEmailSignature,
    IGetUserByIdSignature,
    IGetUsersSignature,
    IUpdateUserSignature
} from '../../repo/interfaces';

export const createUser =
    (config: IConfig): ICreateUserSignature =>
    async (options) => {
        const user = config.db.createUser({
            firstName: options.firstName,
            lastName: options.lastName,
            email: options.email,
            password: options.password,
            role: options.role
        });

        // sendActivationEmail(config, user); // Send notification email

        return user;
    };

export const getUserByEmail =
    (config: IConfig): IGetUserByEmailSignature =>
    async ({ email }) => {
        const user = await config.db.getUserByEmail({
            email
        });

        return user;
    };

export const getUserById =
    (config: IConfig): IGetUserByIdSignature =>
    async ({ id, uid, attributes, isRoles }) => {
        try {
            const user = await config.db.getUserById({ id, uid, attributes, isRoles });

            return user;
        } catch (error) {
            config.logger.error({ fn: 'getUserById', type: 'Service Error', error });
            throw error;
        }
    };

export const getUsers =
    (config: IConfig): IGetUsersSignature =>
    async ({ limit, page, order, domainURL }) =>
        config.db.getUsers({
            limit,
            page,
            order,
            domainURL
        });

export const updateUser =
    (config: IConfig): IUpdateUserSignature =>
    async ({ loggedInUser, data, uid }) => {
        const userStatusArray = Object.values(USER_STATUS);
        const roleArray = Object.values(APP_ROLES).map((role) => role.id);
        const user: any = await config.db.getUserById({ uid });
        const dbInputUser = { ...data };

        if (loggedInUser) {
            if (data.status && !userStatusArray.includes(data.status))
                throw new ForbiddenError('auth.error.InvalidUserAccountStatus');

            if (data.role && loggedInUser.uid === uid) throw new CustomError('user.error.ownRoleChange');

            if (data.role && !roleArray.includes(data.role)) throw new CustomError('user.error.invalidUserRole');

            await ValidateUserAccountStatus(user);
        }

        const updatedUser = await config.db.updateUser({ uid, data: dbInputUser });

        return updatedUser;
    };
