import { ILoginSignature, ILoginSecretSignature, IRefreshTokenSignature } from '../repo/interfaces/auth';
import { IGetGeoAddressSignature } from '../repo/interfaces/geoplaces';
import { CheckDatabaseStatusSignature } from '../repo/interfaces/server';
import {
    IGetUserByIdSignature,
    IGetUserByEmailSignature,
    IGetUsersSignature,
    ICreateUserSignature,
    IUpdateUserSignature
} from '../repo/interfaces/user';

export default interface Service {
    // Auth Services
    readonly login: ILoginSignature;

    readonly loginSecret: ILoginSecretSignature;
    readonly getTokenByRefreshToken: IRefreshTokenSignature;

    // User Services
    readonly getUserById: IGetUserByIdSignature;
    readonly getUserByEmail: IGetUserByEmailSignature;
    readonly getUsers: IGetUsersSignature;
    readonly createUser: ICreateUserSignature;
    readonly updateUser: IUpdateUserSignature;

    readonly checkDatabaseStatus: CheckDatabaseStatusSignature;

    readonly getGeoAddress: IGetGeoAddressSignature;

    readonly getWeatherByGeoAddress: IGetGeoAddressSignature;
}
