/* istanbul ignore file */

import BaseError from './BaseError';

export default class extends BaseError {
    public readonly resourceName: string;

    public constructor(resourceName = '') {
        super();
        this.resourceName = resourceName;
        this.lang_key = 'general.error.unAuthorized';
        this.lang_key_var = { resource_name: this.resourceName };
    }
}
