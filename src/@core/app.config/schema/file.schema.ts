/* eslint-disable unicorn/no-thenable */
import * as Joi from 'joi';

// Block chain Configurations
export default {
    FILES_UPLOAD_PATH: Joi.string().required(),
    LOG_FILE_MAX_SIZE: Joi.string().required(),
    LOG_FILE_MAX_FILES: Joi.string().required(),
    WINSTON_DIRECTORY: Joi.string().required(),
    WINSTON_LEVEL: Joi.string().allow('error', 'warn', 'info', 'verbose', 'debug', 'silly').default('info'),
    EXPRESS_MORGAN_DIRECTORY: Joi.string().required(),
    EXPRESS_MORGAN_LOG_FORMAT: Joi.string().default(':method :url :remote-addr :referrer :date :status'),

    IS_LOCALE_URL: Joi.boolean().default(true),
    LOCALE_PATH: Joi.string(),
    LOCALE_MISSING_PATH: Joi.string(),

    IS_CLOUD_UPLOAD: Joi.boolean().default(false),
    STORAGE_ACCOUNT_NAME: Joi.string()
        .when('IS_CLOUD_UPLOAD', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('STORAGE_ACCOUNT_NAME is required'),
    STORAGE_ACCOUNT_KEY: Joi.string()
        .when('IS_CLOUD_UPLOAD', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('STORAGE_ACCOUNT_KEY is required'),
    STORAGE_CONTAINER_NAME: Joi.string()
        .when('IS_CLOUD_UPLOAD', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('STORAGE_CONTAINER_NAME is required'),

    STORAGE_URI: Joi.string()
        .when('IS_CLOUD_UPLOAD', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('STORAGE_URI is required'),
    STORAGE_ACCESS_TOKEN: Joi.string()
        .when('IS_CLOUD_UPLOAD', {
            is: Joi.boolean().valid(true),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('STORAGE_ACCESS_TOKEN is required')
};
