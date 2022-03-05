import { AsyncHandler } from '../../../../lib';

interface IOptions {
    readonly refreshToken: string;
}

export interface IResponse {
    readonly token: string;
}

type ISignature = AsyncHandler<IOptions, IResponse>;

export default ISignature;
