import { IGetGeoAddressSignature, IGetWeatherByGeoAddressSignature } from '../repo/interfaces';

export default interface Redis {
    readonly getGeoAddress: IGetGeoAddressSignature;
    readonly getGeoWeatherInfo: IGetWeatherByGeoAddressSignature;
}
