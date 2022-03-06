/* istanbul ignore file */

import crypto from 'crypto';
import appConfig from '../@core/app.config';

const { OTP } = appConfig;
const { secretOTP, secretOTPExpiresIn } = OTP;

type HashOTPAttributes = {
    phone: string;
    otp: string | number;
    hash?: string;
};

export const createHashOTP = (params: HashOTPAttributes): string => {
    const { phone, otp } = params;

    const ttl = secretOTPExpiresIn; // 5 Minutes in miliseconds
    const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
    const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp

    const hash = crypto.createHmac('sha256', `${secretOTP}`).update(data).digest('hex'); // creating SHA256 hash of the data
    return `${hash}.${expires}`; // Hash.expires, format to send to the user
};

export const verifyHashOTP = (params: HashOTPAttributes): boolean => {
    const { phone, otp, hash } = params;

    if (!hash) {
        return false;
    }
    const [hashValue, expires] = hash.split('.');

    // Check if expiry time has passed
    const now = Date.now();
    if (now > Number.parseInt(expires, 10)) return false;

    // Calculate new hash with the same key and the same algorithm
    const data = `${phone}.${otp}.${expires}`;
    const newHash = crypto.createHmac('sha256', `${secretOTP}`).update(data).digest('hex');

    // Match the hashes
    if (newHash === hashValue) {
        return true;
    }

    return false;
};
