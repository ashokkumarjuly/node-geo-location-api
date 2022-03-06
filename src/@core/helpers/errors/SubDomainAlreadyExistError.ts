/* istanbul ignore file */

import BaseError from './BaseError';

export default class extends BaseError {
    public constructor(langKey = '', langkeyVar: Record<string, string> = {}) {
        super();
        this.lang_key = langKey || 'artist.error.subDomainNotAvailable';
        this.lang_key_var = langkeyVar;
    }
}
