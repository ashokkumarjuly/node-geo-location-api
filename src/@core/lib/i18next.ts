/* istanbul ignore file */

/* eslint-disable @typescript-eslint/no-var-requires */

import { Application } from 'express';
import AppConfig from '../app.config';

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const HttpBackend = require('i18next-http-backend');

export const EnableTranslation = (_app: Application): void => {
    i18next
        .use(i18nextMiddleware.LanguageDetector)
        .use(AppConfig.locale.isLocaleUrl === true ? HttpBackend : Backend)
        .init({
            fallbackLng: 'en',
            supportedLngs: ['en', 'de', 'es', 'fr'],
            debug: false,
            load: 'languageOnly',
            saveMissing: true,
            backend: {
                loadPath: AppConfig.locale.isLocalePath,
                addPath: AppConfig.locale.isLocaleMissingPath
            },
            interpolation: {
                escapeValue: false // not needed for react as it escapes by default
            }
            // keySeparator: '_',
        });

    _app.use(i18nextMiddleware.handle(i18next));
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const tranlateInstance = i18next.t.bind(i18next);
