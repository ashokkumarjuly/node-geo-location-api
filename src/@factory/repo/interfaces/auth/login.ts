import { AsyncHandler } from '../../../../lib';

interface IOptions {
    readonly email: string;
    readonly code: number | string;
    readonly domainURL?: string;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
