import { AsyncHandler } from '../../../lib';

export interface IOptions {
    readonly key?: string;
}

type ISignature = AsyncHandler<IOptions, string>;

export default ISignature;
