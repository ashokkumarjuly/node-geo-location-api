/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { getUserById, getUserByEmail, getUsers, createUser, updateUser } from './user.service';

// eslint-disable-next-line import/prefer-default-export
export const UserFacades = (config: IConfig) => ({
    getUserById: getUserById(config),
    getUserByEmail: getUserByEmail(config),
    getUsers: getUsers(config),

    createUser: createUser(config),
    updateUser: updateUser(config)
});
