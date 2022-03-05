import { CheckDatabaseStatusSignature } from './interfaces';
import {
    ICreateUserSignature,
    IGetUserByIdSignature,
    IGetUserByEmailSignature,
    IGetUsersSignature,
    IUpdateUserSignature,
    IGetUserByTokenSignature
} from './interfaces/user';

export interface ModelDbInterface {
    // users
    readonly createUser: ICreateUserSignature;
    readonly getUserById: IGetUserByIdSignature;
    readonly getUserByEmail: IGetUserByEmailSignature;
    readonly getUsers: IGetUsersSignature;
    readonly updateUser: IUpdateUserSignature;
    readonly _getUserByEmailToken: IGetUserByTokenSignature;

    readonly checkDatabaseStatus: CheckDatabaseStatusSignature;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Db extends ModelDbInterface {}
