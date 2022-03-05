/* istanbul ignore file */

import * as Joi from 'joi';
import * as dotenv from 'dotenv';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';
import { dbSchema, siteSchema, fileSchema } from './schema';
import { IAppConfig } from './interface';

const appConfig = (): IAppConfig => {
    try {
        let EnvFile = '.env';

        switch (process.env.NODE_ENV) {
            case 'testing':
                EnvFile = `.env.testing`;
                break;
            default:
                EnvFile = `.env`;
        }
        dotenv.config({ path: path.join(__dirname, '../../../', EnvFile) });

        // define validation for all the env vars
        const { error, value } = Joi.object({
            ...siteSchema,
            ...dbSchema,
            ...fileSchema
        })
            .unknown()
            .required()
            .validate(process.env);

        if (error) {
            throw new Error(`EnvFile: ${EnvFile}, Configuration Missing error...: ${error.message}`);
        }

        const envVars = value; // env variables from dotenv and Joi object
        return {
            lang: process.env.LANG || envVars.LANG,
            timezone: process.env.TIMEZONE || envVars.TIMEZONE,
            env: process.env.NODE_ENV || envVars.NODE_ENV,
            isLocal:
                process.env.NODE_ENV || envVars.NODE_ENV ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'local' : false,
            isDev:
                process.env.NODE_ENV || envVars.NODE_ENV
                    ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'development'
                    : false,
            isQA: process.env.NODE_ENV || envVars.NODE_ENV ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'qa' : false,
            isTest:
                process.env.NODE_ENV || envVars.NODE_ENV ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'testing' : false,
            isStaging:
                process.env.NODE_ENV || envVars.NODE_ENV ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'staging' : false,
            isProduction:
                process.env.NODE_ENV || envVars.NODE_ENV
                    ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'production'
                    : false,
            base_URL: process.env.BASE_URL || envVars.BASE_URL,
            WEB_HOST: process.env.WEB_HOST || envVars.WEB_HOST,
            API_RELEASE_VERSION: process.env.API_RELEASE_VERSION || envVars.API_RELEASE_VERSION,
            API_BUILD_VERSION: process.env.API_BUILD_VERSION || envVars.API_BUILD_VERSION,

            ENABLE_HTTPS:
                process.env.ENABLE_HTTPS || envVars.ENABLE_HTTPS
                    ? (process.env.ENABLE_HTTPS || envVars.ENABLE_HTTPS) === 'true'
                    : false,
            ENABLE_CORS:
                process.env.ENABLE_CORS || envVars.ENABLE_CORS
                    ? (process.env.ENABLE_CORS || envVars.ENABLE_CORS) === 'true'
                    : false,
            ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || envVars.ALLOWED_ORIGINS,
            ENABLE_DEBUG:
                process.env.ENABLE_DEBUG || envVars.ENABLE_DEBUG
                    ? (process.env.ENABLE_DEBUG || envVars.ENABLE_DEBUG) === 'true'
                    : false,
            keepAliveTimeout:
                process.env.SERVER_CONNECTIONS_KEEP_ALIVE_TIMEOUT || envVars.SERVER_CONNECTIONS_KEEP_ALIVE_TIMEOUT,
            headersTimeout: process.env.SERVER_CONNECTIONS_HEADERS_TIMEOUT || envVars.SERVER_CONNECTIONS_HEADERS_TIMEOUT,
            express: {
                port: process.env.HTTP_PORT || envVars.HTTP_PORT,
                host: process.env.HTTP_HOST || envVars.HTTP_HOST,
                https_port: process.env.HTTPS_PORT || envVars.HTTPS_PORT,
                ViewEngine: process.env.VIEW_ENGINE || envVars.VIEW_ENGINE,
                viewPath: path.join(__dirname, `../../${process.env.APP_PATH_TEMPLATE || envVars.APP_PATH_TEMPLATE}`),
                publicPath: path.join(__dirname, `../../${process.env.APP_PATH_PUBLIC || envVars.APP_PATH_PUBLIC}`)
            },
            jwt: {
                secretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN || envVars.JWT_SECRET_ACCESS_TOKEN,
                accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN || envVars.JWT_ACCESS_TOKEN_EXPIRED_IN,
                algoritm: process.env.JWT_ALGORITHM || envVars.JWT_ALGORITHM,
                secretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN || envVars.JWT_SECRET_REFRESH_TOKEN,
                secretRefreshTokenExpiresIn:
                    process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN || envVars.JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN
            },
            OTP: {
                secretOTP: process.env.SECRET_OTP || envVars.SECRET_OTP,
                secretOTPMaxReuse: process.env.SECRET_OTP_MAX_REUSE || envVars.SECRET_OTP_MAX_REUSE,
                secretOTPExpiresIn: process.env.SECRET_OTP_EXPIRES_IN || envVars.SECRET_OTP_EXPIRES_IN
            },
            file: {
                isCloudUpload:
                    process.env.IS_CLOUD_UPLOAD || envVars.IS_CLOUD_UPLOAD
                        ? (process.env.IS_CLOUD_UPLOAD || envVars.IS_CLOUD_UPLOAD) === 'true'
                        : false,
                storageAccountName: process.env.STORAGE_ACCOUNT_NAME || envVars.STORAGE_ACCOUNT_NAME,
                storageAccountKey: process.env.STORAGE_ACCOUNT_KEY || envVars.STORAGE_ACCOUNT_KEY,
                storageContainerName: process.env.STORAGE_CONTAINER_NAME || envVars.STORAGE_CONTAINER_NAME,
                storageURI: process.env.STORAGE_URI || envVars.STORAGE_URI,
                storageAccessToken: process.env.STORAGE_ACCESS_TOKEN || envVars.STORAGE_ACCESS_TOKEN,

                uploadPath: path.join(__dirname, `../../../${process.env.FILES_UPLOAD_PATH || envVars.FILES_UPLOAD_PATH}`)
            },
            modelDb: {
                DB_ORM_NAME: process.env.DB_ORM_NAME || envVars.DB_ORM_NAME,
                DB_LOG_QUERY: process.env.DB_LOG_QUERY || envVars.DB_LOG_QUERY,
                username: process.env.DB_USERNAME || envVars.DB_USERNAME,
                password: process.env.DB_PASSWORD || envVars.DB_PASSWORD,
                database: process.env.DB_NAME || envVars.DB_NAME,
                host: process.env.DB_HOSTNAME || envVars.DB_HOSTNAME,
                port: process.env.DB_PORT || envVars.DB_PORT,
                sequelize: {
                    connectionOptions: {
                        dialect: process.env.DB_DIALECT || envVars.DB_DIALECT,
                        logging: (process.env.DB_LOG_QUERY || envVars.DB_LOG_QUERY) === 'true' ? console.log : false,
                        omitNull: true,
                        timezone: process.env.TIMEZONE || envVars.TIMEZONE,
                        pool: {
                            max: Number(process.env.DB_CONNECTION_MAX) || Number(envVars.DB_CONNECTION_MAX) || 300,
                            min: Number(process.env.DB_CONNECTION_MIN) || Number(envVars.DB_CONNECTION_MIN) || 0,
                            acquire:
                                Number(process.env.DB_CONNECTION_ACQUIRE) || Number(envVars.DB_CONNECTION_ACQUIRE) || 30_000,
                            idle: Number(process.env.DB_CONNECTION_IDLE) || Number(envVars.DB_CONNECTION_IDLE) || 10_000
                        },
                        define: {
                            underscored: true,
                            freezeTableName: true,
                            charset: 'utf8',
                            dialectOptions: {
                                collate: 'utf8_general_ci'
                            },
                            timestamp: true,
                            createdAt: 'createdAt',
                            updatedAt: 'updatedAt'
                        }
                    },
                    operatorsAliases: process.env.DB_OPERATOR_ALIASES || envVars.DB_OPERATOR_ALIASES
                },
                mongo: {
                    connectionOptions: {
                        connectTimeoutMS:
                            Number(process.env.DB_CONNECTION_TIMEOUT) || Number(envVars.DB_CONNECTION_TIMEOUT) || 30_000,
                        useCreateIndex: (process.env.DB_CREATE_INDEX || envVars.DB_CREATE_INDEX) === 'true',
                        useFindAndModify: (process.env.DB_FIND_AND_MODIFY || envVars.DB_FIND_AND_MODIFY) === 'true',
                        useNewUrlParser: (process.env.DB_URL_PARSER || envVars.DB_URL_PARSER) === 'true',
                        useUnifiedTopology: (process.env.DB_UNIFIED_TOPOLOGY || envVars.DB_UNIFIED_TOPOLOGY) === 'true',
                        keepAlive: Number(process.env.DB_KEEP_ALIVE) || Number(envVars.DB_KEEP_ALIVE) || 1,
                        poolSize: Number(process.env.DB_CONNECTION_MAX) || Number(envVars.DB_CONNECTION_MAX) || 10
                    }
                }
            },
            mail: {
                enabled:
                    process.env.ENABLE_EMAIL || envVars.ENABLE_EMAIL
                        ? (process.env.ENABLE_EMAIL || envVars.ENABLE_EMAIL) === 'true'
                        : false,
                name: process.env.MAIL_NAME || envVars.MAIL_NAME,
                debug:
                    process.env.EMAIL_DEBUG || envVars.EMAIL_DEBUG
                        ? (process.env.EMAIL_DEBUG || envVars.EMAIL_DEBUG) === 'true'
                        : false,
                host: process.env.EMAIL_HOST || envVars.EMAIL_HOST,
                port: process.env.EMAIL_PORT || envVars.EMAIL_PORT,
                ssl: process.env.EMAIL_SSL || envVars.EMAIL_SSL,
                sendGridApiKey: process.env.SENDGRID_API_KEY || envVars.SENDGRID_API_KEY,
                username: process.env.EMAIL_USERNAME || envVars.EMAIL_USERNAME,
                password: process.env.EMAIL_PASSWORD || envVars.EMAIL_PASSWORD,
                templatePath: path.join(
                    __dirname,
                    `../../${process.env.EMAIL_TEMPLATE_PATH || envVars.EMAIL_TEMPLATE_PATH}`
                ),
                appEmails: {
                    debugEmail: process.env.DEBUG_EMAIL || envVars.DEBUG_EMAIL,
                    siteEmail: process.env.SITE_EMAIL || envVars.SITE_EMAIL,
                    ContactEmail: process.env.CONTACT_EMAIL || envVars.CONTACT_EMAIL,
                    noReplyEmail: process.env.NO_REPLY_EMAIL || envVars.NO_REPLY_EMAIL,
                    bccEmail: process.env.BCC_EMAIL || envVars.BCC_EMAIL
                }
            },
            cachingLibrary: {
                name: process.env.CACHE_LIBRARY_NAME || envVars.CACHE_LIBRARY_NAME,
                enable:
                    process.env.CACHE_ENABLED || envVars.CACHE_ENABLED
                        ? (process.env.CACHE_ENABLED || envVars.CACHE_ENABLED) === 'true'
                        : false,
                clientUrl: process.env.CACHE_CLIENT_URL || envVars.CACHE_CLIENT_URL
            },
            logging: {
                maxSize: process.env.LOG_FILE_MAX_SIZE || envVars.LOG_FILE_MAX_SIZE,
                maxFiles: process.env.LOG_FILE_MAX_FILES || envVars.LOG_FILE_MAX_FILES,
                winstonDirectory: path.join(
                    __dirname,
                    `../../../${process.env.WINSTON_DIRECTORY || envVars.WINSTON_DIRECTORY}`
                ),
                level: process.env.WINSTON_LEVEL || envVars.WINSTON_LEVEL,
                morganDirectory: path.join(
                    __dirname,
                    `../../../${process.env.EXPRESS_MORGAN_DIRECTORY || envVars.EXPRESS_MORGAN_DIRECTORY}`
                ),
                morganLogFormat: process.env.EXPRESS_MORGAN_LOG_FORMAT || envVars.EXPRESS_MORGAN_LOG_FORMAT
            },
            swagger: {
                enable:
                    process.env.SWAGGER_ENABLE || envVars.SWAGGER_ENABLE
                        ? (process.env.SWAGGER_ENABLE || envVars.SWAGGER_ENABLE) === 'true'
                        : false,
                path: path.join(__dirname, `../../../${process.env.SWAGGER_PATH || envVars.SWAGGER_PATH}`),
                url: process.env.SWAGGER_URL || envVars.SWAGGER_URL,
                username: process.env.SWAGGER_USERNAME || envVars.SWAGGER_USERNAME,
                password: process.env.SWAGGER_PASSWORD || envVars.SWAGGER_PASSWORD
            },
            testSuite: {
                enable:
                    process.env.TEST_COVERAGE_ENABLE || envVars.TEST_COVERAGE_ENABLE
                        ? (process.env.TEST_COVERAGE_ENABLE || envVars.TEST_COVERAGE_ENABLE) === 'true'
                        : false,
                coveragePath: path.join(
                    __dirname,
                    `../../../${process.env.TEST_COVERAGE_PATH || envVars.TEST_COVERAGE_PATH}`
                ),
                jestStarePath: path.join(
                    __dirname,
                    `../../../${process.env.TEST_JEST_STARE_PATH || envVars.TEST_JEST_STARE_PATH}`
                )
            },
            apiDoc: {
                enable:
                    process.env.APIDOC_ENABLE || envVars.APIDOC_ENABLE
                        ? (process.env.APIDOC_ENABLE || envVars.APIDOC_ENABLE) === 'true'
                        : false,
                path: path.join(__dirname, `../../../${process.env.APIDOC_PATH || envVars.APIDOC_PATH}`),
                url: process.env.APIDOC_URL || envVars.APIDOC_URL,
                username: process.env.APIDOC_USERNAME || envVars.APIDOC_USERNAME,
                password: process.env.APIDOC_PASSWORD || envVars.APIDOC_PASSWORD
            },
            locale: {
                isLocaleUrl:
                    process.env.IS_LOCALE_URL || envVars.IS_LOCALE_URL
                        ? (process.env.IS_LOCALE_URL || envVars.IS_LOCALE_URL) === 'true'
                        : false,
                get isLocalePath() {
                    return this.isLocaleUrl === true
                        ? process.env.LOCALE_PATH || envVars.LOCALE_PATH
                        : path.join(__dirname, `../../${process.env.LOCALE_PATH || envVars.LOCALE_PATH}`);
                },
                get isLocaleMissingPath() {
                    return this.isLocaleUrl === true
                        ? process.env.LOCALE_MISSING_PATH || envVars.LOCALE_MISSING_PATH
                        : path.join(__dirname, `../../${process.env.LOCALE_MISSING_PATH || envVars.LOCALE_MISSING_PATH}`);
                }
            }
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default appConfig();
