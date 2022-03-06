/* istanbul ignore file */

/* eslint-disable import/prefer-default-export */
import * as Joi from 'joi';

export const getAddressSchema = Joi.object().keys({
    addressdetails: Joi.number().min(0).required(),
    filter: Joi.object({
        street: Joi.alternatives().try(Joi.number(), Joi.string().min(2).max(100)).required(),
        town: Joi.alternatives().try(Joi.number(), Joi.string().min(2).max(100)).required(),
        postalcode: Joi.alternatives().try(Joi.number(), Joi.string().max(10)).required(),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.alternatives().try(Joi.number(), Joi.string().max(50)).allow(null).allow('').optional(),
        state: Joi.alternatives().try(Joi.number(), Joi.string().max(50)).allow(null).allow('').optional()
    }).required()
});

export const getWeatherSchema = Joi.object().keys({
    addressdetails: Joi.number().min(0).required(),
    product: Joi.string().required().valid('astro', 'civil', 'civillight', 'meteo', 'two').required(),
    filter: Joi.object({
        street: Joi.alternatives().try(Joi.number(), Joi.string().min(2).max(100)).required(),
        town: Joi.alternatives().try(Joi.number(), Joi.string().min(2).max(100)).required(),
        postalcode: Joi.alternatives().try(Joi.number(), Joi.string().max(10)).required(),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.alternatives().try(Joi.number(), Joi.string().max(50)).allow(null).allow('').optional(),
        state: Joi.alternatives().try(Joi.number(), Joi.string().max(50)).allow(null).allow('').optional()
    }).required()
});
