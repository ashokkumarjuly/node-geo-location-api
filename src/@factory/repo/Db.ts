import {
    ICreateGeoPlaceSignature,
    ICreateGeoWeatherSignature,
    IDeleteGeoPlaceSignature,
    IDeleteGeoWeatherSignature,
    IGetGeoPlacesByAddressSignature,
    IGetGeoWeatherInfoSignature
} from './interfaces/geoplaces';
import { CheckDatabaseStatusSignature } from './interfaces/server';
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

    readonly createGeoPlace: ICreateGeoPlaceSignature;
    readonly getGeoPlace: IGetGeoPlacesByAddressSignature;
    readonly deleteGeoPlace: IDeleteGeoPlaceSignature;

    readonly createGeoWeather: ICreateGeoWeatherSignature;
    readonly getGeoWeatherInfo: IGetGeoWeatherInfoSignature;
    readonly deleteGeoWeather: IDeleteGeoWeatherSignature;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Db extends ModelDbInterface {}
