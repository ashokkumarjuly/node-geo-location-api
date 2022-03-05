// import moment from 'moment';
// eslint-disable-next-line unicorn/import-style
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import APP_CONFIG from './@core/app.config';
import { DateFormat } from './helpers/dateFormat';

//
// Replaces the previous transports with those in the
// new configuration wholesale.
//

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: DateFormat.FORMAT_TWO }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `[${info.timestamp}]-[${info.level}]:${info.message}`)
);

const logger = winston.createLogger({
    level: APP_CONFIG.logging.level,
    // format: winston.format.json(),
    format,
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //

        new DailyRotateFile({
            filename: `${APP_CONFIG.logging.winstonDirectory}/error-%DATE%.log`,
            datePattern: DateFormat.FORMAT_FIVE,
            maxSize: APP_CONFIG.logging.maxSize,
            maxFiles: APP_CONFIG.logging.maxFiles,
            level: 'error'
        }),
        new DailyRotateFile({
            filename: `${APP_CONFIG.logging.winstonDirectory}/access-%DATE%.log`,
            datePattern: DateFormat.FORMAT_FIVE,
            maxSize: APP_CONFIG.logging.maxSize,
            maxFiles: APP_CONFIG.logging.maxFiles,
            level: 'http'
        }),
        new DailyRotateFile({
            filename: `${APP_CONFIG.logging.winstonDirectory}/combined-%DATE%.log`,
            datePattern: DateFormat.FORMAT_FIVE,
            maxSize: APP_CONFIG.logging.maxSize,
            maxFiles: APP_CONFIG.logging.maxFiles,
            level: 'info'
        })
    ]
});

if (APP_CONFIG.ENABLE_DEBUG === true) {
    logger.add(new winston.transports.Console());
}

export default logger;
