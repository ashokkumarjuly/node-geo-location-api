/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { checkDatabaseStatus } from './controller';

export default class {
    public _router: Router;

    public _config: ICoreConfig;

    constructor(config: ICoreConfig) {
        this._router = Router();
        this._config = config;
        this._routes();
    }

    public _routes(): void {
        /*
         * @api {get} /server/status
         * @apiName Check server status
         * @apiGroup Server
         * @apiPermission public
         * @apiSuccess 200.
         */
        this._router.get('/health', (req, res) => {
            const data = {
                uptime: process.uptime(),
                message: 'Ok',
                date: new Date()
            };

            res.status(200).send(data);
        });

        /*
         * @api {get} /server/check-db
         * @apiName Check server status
         * @apiGroup Server
         * @apiPermission public
         * @apiSuccess 200.
         * @apiError 503.
         */
        this._router.get('/check-db', checkDatabaseStatus(this._config));
    }
}
