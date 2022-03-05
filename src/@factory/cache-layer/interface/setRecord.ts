import { AsyncHandler } from '../../../lib';

export interface Data {
    readonly key?: string;
    readonly value?: string;
    readonly expirationTime?: number | null;
}

export interface IOptions {
    readonly data: Data;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
