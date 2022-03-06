import { AsyncHandler } from '../../../../lib';
import { IGeoWeatherAttributes } from './geoPlaceAttributes';

export interface IOptions {
    readonly product: string;
    readonly lat: number;
    readonly lon: number;
    readonly infoMeta: string;
}

type ISignature = AsyncHandler<IOptions, IGeoWeatherAttributes>;

export default ISignature;
