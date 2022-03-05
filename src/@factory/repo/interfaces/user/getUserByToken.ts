import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly token: string;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
