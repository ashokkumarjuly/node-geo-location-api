/* istanbul ignore file */

import { Application } from 'express';

import * as FileStreamRotator from 'file-stream-rotator';
import * as morgan from 'morgan';
import APP_CONFIG from '../app.config';
import logger from '../../logger';

export default (_app: Application): void => {
    // Override the stream method by telling
    // Morgan to use our custom logger instead of the console.log.
    const localStream: morgan.StreamOptions = {
        // Use the http severity
        write: (message: string) => logger.http(message)
    };

    const accessLogStream: NodeJS.WritableStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: `${APP_CONFIG.logging.morganDirectory}/access-%DATE%.log`,
        frequency: 'custom',
        verbose: false,
        size: '5M'
    });

    _app.use(
        morgan(APP_CONFIG.logging.morganLogFormat, {
            stream: APP_CONFIG.isLocal === true ? localStream : accessLogStream
        })
    );
};
