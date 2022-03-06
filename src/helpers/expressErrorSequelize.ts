/* istanbul ignore file */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { BaseError, EmptyResultError, ValidationError } from 'sequelize';
import { StatusCodes } from 'http-status-codes';

function msg(message: string) {
    return `Sequelize Error: ${message}`;
}

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        if (err instanceof EmptyResultError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                code: StatusCodes.NOT_FOUND,
                message: msg('Data not found')
            });
        }

        if (err instanceof ValidationError) {
            const errors: any[] = get(err, 'errors', []);
            const errorMessage = get(errors, '0.message', null);

            const dataError = {
                code: StatusCodes,
                message: errorMessage ? `Validation error: ${errorMessage}` : err.message,
                errors: errors.reduce<any>((acc, curVal) => {
                    acc[curVal.path] = curVal.message;
                    return acc;
                }, {})
            };

            return res.status(StatusCodes.BAD_REQUEST).json(dataError);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: msg(err.message)
        });
    }

    next(err);
};
