/* istanbul ignore file */

/* Validation Middleware
 * Validate body or query against Joi schema
 */
import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { extend } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import handleError from '../handleError';
import { ICoreConfig } from '../../@core/ICoreConfig';

export default (config: ICoreConfig, schema: Joi.Schema, queryParam = true) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const body = extend({}, queryParam ? req.query : req.body);
        delete body.access_token; // remove access token for api calls
        const errorId = uuidv4();

        const { error } = schema.validate(body);

        if (error) {
            const details: Array<string> = [];
            if (error.details) {
                // eslint-disable-next-line no-restricted-syntax
                for (const d of error.details) {
                    details.push(d.message);
                }
                const e = new Joi.ValidationError('ValidationError', details.join(', '), '');

                return handleError({
                    config,
                    errorId,
                    req,
                    res,
                    err: { ...e, lang_key: 'general.error.JoiValidationError', lang_key_var: { detail: details.join(', ') } }
                });
            }

            return handleError({
                config,
                errorId,
                req,
                res,
                err: { ...error, lang_key: 'general.error.JoiValidationError', lang_key_var: {} }
            });
        }

        return next();
    };
