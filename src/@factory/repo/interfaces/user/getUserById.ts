import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly id?: number;
    readonly uid?: string;
    readonly domainURL?: string;
    readonly isRoles?: boolean;
    readonly attributes?: Array<string>;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
