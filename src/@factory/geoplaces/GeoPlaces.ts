import { IGetGeoPlaceSignature, IGetWeatherByGeoPlaceSignature } from '../repo/interfaces';

export default interface Redis {
    readonly getGeoPlace: IGetGeoPlaceSignature;
    readonly getGeoWeatherInfo: IGetWeatherByGeoPlaceSignature;
}
