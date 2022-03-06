import { IUserAttributes } from '../../repo/interfaces';
import { AsyncHandler } from '../../../lib';

export interface IOptions {
    email: string;
    user: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
