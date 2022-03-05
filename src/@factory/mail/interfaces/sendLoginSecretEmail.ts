import { AsyncHandler } from '../../../lib';

interface Login {
    otp: number;
    readonly base_url: string;
    readonly expiresIn: string;
}

export interface IOptions {
    email: string;
    data: Login;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
