/* istanbul ignore file */

import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { ICoreConfig } from '../@core/ICoreConfig';
import { ExpressHanlder } from '../@core/lib';
import handleError, { CustomError } from './handleError';

export default (config: ICoreConfig, handler: ExpressHanlder) =>
    async (req: Request, res: Response): Promise<any> => {
        try {
            return await handler(req, res);
        } catch (error) {
            const errorId = v4();
            config.logger.silly(`${errorId}: API request`, {
                headers: req.headers,
                method: req.method
            });

            return handleError({ config, req, res, errorId, err: error as CustomError });
        }
    };
