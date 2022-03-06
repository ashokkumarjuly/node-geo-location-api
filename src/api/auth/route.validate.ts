/* istanbul ignore file */

import * as Joi from 'joi';

const loginSecretSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    isResend: Joi.boolean().optional()
});

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.number().integer().min(100_000).max(999_999)
});

const refreshTokenSchema = Joi.object().keys({
    refreshToken: Joi.string().required()
});
// .xor('username', 'email');

// .xor('oauthToken');

// eslint-disable-next-line import/prefer-default-export
export { loginSchema, loginSecretSchema, refreshTokenSchema };
