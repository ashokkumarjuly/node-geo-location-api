export interface IUserAttributes {
    id?: number;
    uid?: string;
    firstName?: string;
    lastName?: string;
    full_name?: string;
    email?: string;
    password?: string;
    role?: number;
    phoneNo?: string;
    phoneCode?: string;
    profileImage?: string | null;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    countryCode?: string;
    zipCode?: string | number;
    profileCompletion?: number;
    status?: number;
    emailVerified?: number;
    authToken?: string | null;
    verificationTokenExpires?: string | null;
    timeZone?: string;
    lastLoginDate?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    deletedAt?: string | Date;
}
