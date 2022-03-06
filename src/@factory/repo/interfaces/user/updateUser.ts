import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface Data {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly password?: string;
    readonly emailVerified?: number;
    readonly status?: number;
    readonly role?: number;
    readonly authToken?: string | null;
    readonly verificationTokenExpires?: string | null;
    readonly phoneCode?: string;
    readonly phoneNo?: string;
    readonly address?: string;
    readonly address2?: string;
    readonly city?: string;
    readonly state?: string;
    readonly countryCode?: string;
    readonly zipCode?: string | number;
    readonly profileImage?: string | null;
}

export interface IOptions {
    readonly uid: string;
    readonly data: Data;
    readonly loggedInUser?: IUserAttributes;
    readonly domainURL?: string;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
