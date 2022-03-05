import { AsyncHandler } from '../../../../lib';

interface IOptions {
    readonly email: string;
}

type ISignature = AsyncHandler<IOptions, boolean | string>;

export default ISignature;
