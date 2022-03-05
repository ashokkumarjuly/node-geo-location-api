/* eslint-disable unicorn/no-thenable */
import * as Joi from 'joi';
import { ONE_HOUR } from '../../../constants';

// SERVER Configurations
export default {
    NODE_ENV: Joi.string().allow('development', 'production', 'test', 'staging', 'provision', 'qa').default('development'),
    LANG: Joi.string().allow('en', 'es').default('en'),
    TIMEZONE: Joi.string().default('+00:00'),
    API_RELEASE_VERSION: [Joi.string(), Joi.number()],
    API_BUILD_VERSION: [Joi.string(), Joi.number()],

    ENABLE_HTTPS: Joi.boolean().default(false),
    ENABLE_CORS: Joi.boolean().default(false),
    HTTP_PORT: [Joi.string(), Joi.number()],
    HTTP_HOST: Joi.string().required(),
    HTTPS_PORT: [Joi.string(), Joi.number()],

    SERVER_CONNECTION_KEEP_ALIVE_TIMEOUT: Joi.number().required(),
    SERVER_CONNECTION_HEADERS_TIMEOUT: Joi.number().required(),

    WEB_HOST: Joi.string().required(),
    BASE_URL: Joi.string().required(),
    ALLOWED_ORIGINS: Joi.string().required(),

    ENABLE_DEBUG: Joi.boolean().default(false),
    RATE_LIMITER: Joi.boolean().default(false).description('Rate limiter option should be boolean'),

    MODEL_DB_NAME: Joi.string().default('sequelize'),
    MODEL_MAIL_DB: Joi.string().default('nodemailer'),

    // JWT Configurations
    JWT_SECRET_ACCESS_TOKEN: Joi.string().required().description('JWT Secret required'),
    JWT_ACCESS_TOKEN_EXPIRED_IN: Joi.number().default(ONE_HOUR),
    JWT_LOGIN_TOKEN_EXPIRED_IN: Joi.number().default(ONE_HOUR),
    JWT_ALGORITHM: Joi.string().default('HS256'),
    JWT_SECRET_REFRESH_TOKEN: Joi.string().required().description('JWT Refresh Secret required'),
    JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN: Joi.number().default(ONE_HOUR),

    SECRET_OTP: Joi.string().required().description('SECRET OTP required.'),
    SECRET_OTP_EXPIRES_IN: Joi.number().required().description('SECRET_OTP_EXPIRES_IN required.'),
    SECRET_OTP_MAX_REUSE: Joi.number().required().description('SECRET_OTP_MAX_REUSE required.'),

    VIEW_ENGINE: Joi.string().required().description('App view engine is required'),
    APP_PATH_TEMPLATE: Joi.string().required().description('App template view path required'),

    // Test Coverage
    TEST_COVERAGE_ENABLE: Joi.boolean().default(false),
    TEST_COVERAGE_PATH: Joi.string().when('TEST_COVERAGE_ENABLE', {
        is: Joi.boolean().valid(true),
        then: Joi.string().required().default('coverage'),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),

    TEST_JEST_STARE_PATH: Joi.string().when('TEST_COVERAGE_ENABLE', {
        is: Joi.boolean().valid(true),
        then: Joi.string().required().default('jest-stare'),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),

    // Redis Cache
    CACHE_ENABLED: Joi.boolean().default(false),
    CACHE_LIBRARY_NAME: Joi.string()
        .when('CACHE_ENABLED', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('Cache library name is required'),

    CACHE_CLIENT_URL: Joi.string()
        .when('CACHE_ENABLED', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('Cache connection string is required'),

    // Market Place Sync
    WP_API_AUTO_SYNC_ENABLED: Joi.boolean().default(false),
    WP_SECRET_KEY: Joi.string()
        .when('WP_API_AUTO_SYNC_ENABLED', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('Market place secret key is required'),

    // Analytics
    ENABLE_ANALYTICS: Joi.boolean().default(false),
    MATOMO_SITE_URL: Joi.string()
        .when('ENABLE_ANALYTICS', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('Matomo site url is required'),

    MATOMO_SITE_ID: Joi.number()
        .when('ENABLE_ANALYTICS', {
            is: Joi.boolean().valid(true),
            then: Joi.number().required(),
            otherwise: Joi.number().optional().allow(null).allow('')
        })
        .description('matomo site id is required')
};
