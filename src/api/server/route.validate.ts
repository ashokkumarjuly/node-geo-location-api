/* istanbul ignore file */

import * as Joi from 'joi';

export const filterSchema = Joi.object().keys({
    limit: Joi.string().optional().allow(''),
    page: Joi.string().optional().allow(''),
    term: Joi.string().optional().allow('')
});
