import GeoPlace from './GeoPlace';
import GeoWeather from './GeoWeather';
import User from './User';

export interface IModels {
    User: typeof User;
    GeoPlace: typeof GeoPlace;
    GeoWeather: typeof GeoWeather;

    // [key: string]: typeof key;
}

export { default as User } from './User';
export { default as GeoPlace } from './GeoPlace';
export { default as GeoWeather } from './GeoWeather';
