/* istanbul ignore file */

/* eslint-disable unicorn/no-process-exit */
import * as sourceMapSupport from 'source-map-support';

import * as http from 'http';
// import * as https from 'https';
// eslint-disable-next-line unicorn/import-style
import * as express from 'express';
import APP_CONFIG from './@core/app.config';
import logger from './logger';
import app from './app';

sourceMapSupport.install();

class Server {
    public app: express.Express;

    public _server: any;

    constructor() {
        this.app = app;
    }

    public startServer(): void {
        const httpServer: http.Server = http.createServer(this.app);
        const httpPort = APP_CONFIG.express.port;
        const httpHost = APP_CONFIG.express.host;
        // Starting Http server
        this.startHttp(httpServer, httpPort, httpHost);
    }

    // eslint-disable-next-line class-methods-use-this
    private startHttp(_server: http.Server, port: number, host: string): void {
        this._server = _server
            .listen(port, host, () => {
                const logPort = `[p ${process.pid}]:: API Server environment ${APP_CONFIG.env} is Listening at port ${port}, Host ${host}, Database::${APP_CONFIG.modelDb.sequelize.connectionOptions.dialect}:${APP_CONFIG.modelDb.host}:${APP_CONFIG.modelDb.port}`;
                console.log(`*********\n${logPort}*********\n`);
                logger.info(logPort);
                if (process.send !== undefined) {
                    logger.info('API Process ready');
                    process.send('ready');
                }
            })
            .on('error', (error: NodeJS.ErrnoException) => {
                if (error.syscall !== 'listen') throw error;
                const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
                switch (error.code) {
                    case 'EACCES':
                        console.error(`${bind} requires elevated privileges`);
                        process.exit(1);
                        break;
                    case 'EADDRINUSE':
                        console.error(`${bind} is already in use`);
                        process.exit(1);
                        break;
                    default:
                        throw error;
                }
            });
        this._server.keepAliveTimeout = APP_CONFIG.keepAliveTimeout;
        this._server.headersTimeout = APP_CONFIG.headersTimeout;
    }

    public getServer(): http.Server {
        return this._server;
    }
}

const server = new Server();
server.startServer();

export default server.getServer();

const handleExit = (event: string) => (error?: any) => {
    if (error) logger.error(error.stack);
    logger.info(event);
    process.exit();
};

if (process.on) {
    process.on('exit', handleExit('exit'));
    process.on('SIGINT', handleExit('SIGINT'));
    process.on('SIGTERM', handleExit('SIGTERM'));
    process.on('uncaughtException', handleExit('uncaughtException'));
    process.on('unhandledRejection', handleExit('unhandledRejection'));
}
