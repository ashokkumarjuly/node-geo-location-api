/* istanbul ignore file */

import * as express from 'express';
import logger from './logger';
import InitApp from './@core/express';
import { dbFactory, serviceFactory } from './@factory';
import Db from './@factory/repo/Db';
import Service from './@factory/service/Service';

export class App {
    public app: express.Express;

    public db: Db;

    public service: Service;

    public translator: any;

    public presenterFacade: any;

    public _server: any;

    constructor() {
        this.app = express();
        this.db = dbFactory();
        this.service = serviceFactory();
        this.initLoaders();
    }

    public initLoaders(): void {
        this.enableFactories();
        this.enablePresenter();
    }

    private enableFactories(): void {
        this.service = serviceFactory();
    }

    private enablePresenter(): void {
        // eslint-disable-next-line no-new
        new InitApp({
            service: this.service,
            logger,
            // translator: this.translator,
            app: this.app
        });
    }
}

export default new App().app;
