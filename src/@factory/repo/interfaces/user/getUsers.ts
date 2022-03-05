import { AsyncHandler } from '../../../../lib';

export interface IOptions {
    readonly limit?: number;
    readonly page?: number;
    readonly order?: string;
    readonly search?: string;
    readonly domainURL?: string;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
