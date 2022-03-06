import { AsyncHandler } from '../../../../lib';
import { IGeoPlaceAttributes } from './geoPlaceAttributes';

export interface IOptions {
    readonly addressdetails: number;
    readonly street: string;
    readonly town: string;
    readonly postalcode: string;
    readonly country: string;
    readonly infoMeta: string;

    readonly city?: string;
    readonly state?: string;

    readonly product?: string;
    readonly lat?: number;
    readonly lon?: number;
}

type ISignature = AsyncHandler<IOptions, IGeoPlaceAttributes>;

export default ISignature;
