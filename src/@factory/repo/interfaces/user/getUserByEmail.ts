import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly email: string;
    readonly domainURL?: string;
    readonly attributes?: string[];
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
