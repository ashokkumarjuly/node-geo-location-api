/* istanbul ignore file */

import BaseError from './BaseError';

export default class extends BaseError {
    public constructor() {
        super();

        this.lang_key = 'general.error.expiredResetPasswordToken';
        this.lang_key_var = {};
    }
}
