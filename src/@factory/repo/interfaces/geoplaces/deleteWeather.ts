import { AsyncHandler } from '../../../../lib';

export interface IOptions {
    readonly _id: string;
    readonly uid?: string;
}

type ISignature = AsyncHandler<IOptions, boolean>;

export default ISignature;
