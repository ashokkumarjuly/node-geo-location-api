/* eslint-disable unicorn/no-thenable */
import * as Joi from 'joi';

// DB Configurations

export default {
    DB_ORM_NAME: Joi.string().allow('sequelize').default('sequelize'),
    DB_HOSTNAME: Joi.string().required().description('Database host required'),
    DB_PORT: Joi.number().required().description('Database Port required'),
    DB_USERNAME: Joi.string().required().description('Database username required'),
    DB_PASSWORD: Joi.string().allow('').description('Database password required'),
    DB_NAME: Joi.string().required().description('Database Name required'),
    DB_CONNECTION_MAX: Joi.number().default(300),

    DB_DIALECT: Joi.string()
        .when('DB_ORM_NAME', {
            is: Joi.string().valid('sequelize'),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null).allow('')
        })
        .description('DB_DIALECT name is required'),
    DB_OPERATOR_ALIASES: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('sequelize'),
        then: Joi.string().default(false),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_LOG_QUERY: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('sequelize'),
        then: Joi.string().default(false),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_CONNECTION_MIN: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('sequelize'),
        then: Joi.string().default(0),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_CONNECTION_ACQUIRE: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('sequelize'),
        then: Joi.string().default(30_000),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_CONNECTION_IDLE: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('sequelize'),
        then: Joi.string().default(10_000),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),

    DB_CONNECTION_TIMEOUT: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().default(30_000),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_CREATE_INDEX: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_FIND_AND_MODIFY: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_URL_PARSER: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_UNIFIED_TOPOLOGY: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(null).allow('')
    }),
    DB_KEEP_ALIVE: Joi.string().when('DB_ORM_NAME', {
        is: Joi.string().valid('mongo'),
        then: Joi.string().default(1),
        otherwise: Joi.string().optional().allow(null).allow('')
    })
};
