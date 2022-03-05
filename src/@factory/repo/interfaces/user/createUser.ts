import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email: string;
    readonly password?: string;
    readonly role: number;
    readonly address?: string;
    readonly address2?: string;
    readonly city?: string;
    readonly state?: string;
    readonly zipCode?: string;
    readonly countryCode?: string;
    readonly phoneNo?: string;
    readonly phoneCode?: string;
    readonly profileCompletion?: number;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
