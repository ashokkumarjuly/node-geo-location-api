/* istanbul ignore file */

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import { get } from 'lodash';
import {
    EmptyResultError,
    ValidationError as SequelizeValidationError,
    DatabaseError,
    UniqueConstraintError,
    ForeignKeyConstraintError
} from 'sequelize';
import { ICoreConfig } from '../@core/ICoreConfig';
import {
    ModelAlreadyExistsError,
    ForbiddenError,
    RecordAlreadyExistsError,
    InvalidResetPasswordTokenError,
    ExpiredResetPasswordTokenError,
    InvalidCredentialsError,
    // NotFoundError,
    ModelNotFoundError,
    UnauthorizedError,
    MissingJwtTokenError,
    MissingJwtTokenExtractorError,
    ExpiredJwtTokenError,
    InvalidJwtTokenError,
    SubDomainAlreadyExistError,
    ServerError
} from '../@core/helpers/errors';

export interface CustomError extends Error {
    lang_key: string | undefined;
    lang_key_var: Record<string, string> | undefined;
    meta?: Record<string, unknown>;
}
export interface IOptions {
    readonly config: ICoreConfig;
    readonly errorId: string;
    readonly req: Request;
    readonly res: Response;
    readonly err: CustomError;
}

const { UNPROCESSABLE_ENTITY, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, BAD_REQUEST, SERVICE_UNAVAILABLE } = StatusCodes;

const jsonFriendlyErrorReplacer = (key: string, value: any) => {
    if (value instanceof Error) {
        return {
            // Pull all enumerable properties, supporting properties on custom Errors
            ...value,
            // Explicitly pull Error's non-enumerable properties
            name: value.name,
            message: value.message,
            stack: value.stack
        };
    }

    return value;
};

const getPureError = (error: any) => {
    return JSON.parse(JSON.stringify(error, jsonFriendlyErrorReplacer));
};

export default ({ config, req, res, errorId, err }: IOptions): Response => {
    const { logger } = config;
    const logError = (msg: string, meta?: any) => {
        logger.error(`${errorId}: error handled - ${msg}`, meta);
    };

    if (err instanceof Joi.ValidationError) {
        const message = `Validation Error`;
        err.message = err.details.toString() || message;
        res.statusCode = BAD_REQUEST;
    } else if (err instanceof InvalidCredentialsError) {
        const message = `Incorrect email or password`;
        err.message = err.message || message;
        res.statusCode = UNPROCESSABLE_ENTITY;
    } else if (err instanceof MissingJwtTokenError) {
        const message = `Missing JWT token`;
        err.message = err.message || message;
        res.statusCode = UNAUTHORIZED;
    } else if (err instanceof MissingJwtTokenExtractorError) {
        const message = `Missing JWT token extractor`;
        err.message = err.message || message;
        res.statusCode = UNAUTHORIZED;
    } else if (err instanceof ExpiredJwtTokenError || err instanceof UnauthorizedError) {
        const message = `Unauthorized`;
        err.message = err.message || message;
        res.statusCode = UNAUTHORIZED;
    } else if (err instanceof InvalidJwtTokenError) {
        const message = `Invalid JWT token`;
        err.message = err.message || message;
        res.statusCode = UNAUTHORIZED;
    } else if (err instanceof ModelNotFoundError) {
        const message = `Model Not found`;
        err.message = err.message || message;
        res.statusCode = NOT_FOUND;
    } else if (err instanceof ServerError) {
        const message = `Service Unavailable`;
        err.message = err.message || message;
        res.statusCode = SERVICE_UNAVAILABLE;
    } else if (err instanceof InvalidResetPasswordTokenError) {
        const message = `Invalid reset password token`;
        err.message = err.message || message;
        res.statusCode = UNPROCESSABLE_ENTITY;
    } else if (err instanceof ExpiredResetPasswordTokenError) {
        const message = `Expired reset password token`;
        err.message = err.message || message;
        res.statusCode = UNPROCESSABLE_ENTITY;
    } else if (err instanceof RecordAlreadyExistsError) {
        const message = `User already exists`;
        err.message = err.message || message;
        res.statusCode = CONFLICT;
    } else if (err instanceof ModelAlreadyExistsError) {
        const message = `Model already exists`;
        err.message = err.message || message;
        res.statusCode = CONFLICT;
    } else if (err instanceof ForbiddenError) {
        const message = `Forbidden`;
        err.message = err.message || message;
        res.statusCode = FORBIDDEN;
    } else if (err instanceof EmptyResultError) {
        const message = 'No records found.';
        err.message = err.message || message;
        res.statusCode = FORBIDDEN;
    } else if (err instanceof SequelizeValidationError) {
        const errors: any[] = get(err, 'errors', []);
        const errorMessage = get(errors, '0.message', null);
        const message = errorMessage ? `Validation error: ${errorMessage}` : err.message;

        err.message = message || err.message;
        err.meta = errors.reduce<any>((acc, curVal) => {
            acc[curVal.path] = curVal.message;
            return acc;
        }, {});
        res.statusCode = BAD_REQUEST;
    } else if (err instanceof DatabaseError) {
        const message = 'Database error...';
        err.lang_key = 'general.error.SequelizeDatabaseError';
        err.message = err?.original?.message || err?.parent?.message || message;
        err.lang_key_var = { detail: err.message };
        err.meta = { error: err?.original?.message };
        res.statusCode = BAD_REQUEST;
    } else if (err instanceof UniqueConstraintError) {
        const message = 'Database error...';
        err.message = err?.original?.message || err?.parent?.message || message;
        err.lang_key = 'general.error.SequelizeUniqueConstraintError';
        err.lang_key_var = { detail: err.message };
        err.meta = { error: err?.original?.message };
        res.statusCode = BAD_REQUEST;
    } else if (err instanceof ForeignKeyConstraintError) {
        const message = 'Database error...';
        err.message = err?.original?.message || err?.parent?.message || message;
        err.lang_key = 'general.error.SequelizeForeignKeyConstraintError';
        err.lang_key_var = { detail: err.message };
        err.meta = { error: err?.original?.message };
        res.statusCode = BAD_REQUEST;
    } else if (err instanceof SubDomainAlreadyExistError) {
        const message = 'sub-domain is not available for activation, please change the sub-domain name and retry';
        err.message = err.message || message;
        res.statusCode = CONFLICT;
    }

    logError(`Server Error - ${JSON.stringify(err)}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { lang_key, lang_key_var } = err;

    if (lang_key) {
        err.message = req.t(lang_key, lang_key_var);
    }

    const errorOject = err;

    if (res.statusCode === 200) {
        res.statusCode = BAD_REQUEST;
    }

    return res.json({ success: false, error: getPureError(errorOject) });
};
