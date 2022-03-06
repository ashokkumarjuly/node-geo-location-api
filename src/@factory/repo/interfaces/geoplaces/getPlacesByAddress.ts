import { AsyncHandler } from '../../../../lib';
import { IGeoPlaceAttributes } from './geoPlaceAttributes';

export interface IOptions {
    readonly attributes?: Record<any, any>;
}

type ISignature = AsyncHandler<IOptions, IGeoPlaceAttributes>;

export default ISignature;
