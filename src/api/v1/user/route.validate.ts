/* istanbul ignore file */

/* eslint-disable import/prefer-default-export */
import * as Joi from 'joi';
import { APP_ROLES } from '../../../constants';

export const createSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(6).max(200).required(),
    role: Joi.number().valid(APP_ROLES.USER.id, APP_ROLES.GUEST.id).required()
});

export const updateSchema = Joi.object().keys({
    firstName: Joi.string().max(50).optional().allow(null).allow(''),
    lastName: Joi.string().max(50).optional(),
    phoneCode: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
    phoneNo: Joi.string().allow('').allow(null).length(10).regex(/^\d+$/),
    address: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
    address2: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
    city: Joi.string().optional().allow('').allow(null),
    state: Joi.string().optional().allow('').allow(null),
    countryCode: Joi.string().max(3).optional().allow(null),
    zipCode: Joi.alternatives().try(Joi.number(), Joi.string().max(10)).allow(null).allow('').optional(),
    profileImage: Joi.string().max(255).optional().allow(null).allow('')
});

export const filterSchema = Joi.object().keys({
    limit: Joi.string().optional().allow(''),
    page: Joi.string().optional().allow(''),
    term: Joi.string().optional().allow(''),
    status: Joi.string().optional().allow(''),
    role: Joi.string().optional().allow('').valid(APP_ROLES.ADMIN.label, APP_ROLES.USER.label, APP_ROLES.GUEST.label),
    email: Joi.string().optional().allow('')
});

export const updatePasswordSchema = Joi.object().keys({
    current_password: Joi.string().min(7).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
