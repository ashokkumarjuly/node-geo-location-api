/* istanbul ignore file */

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import AppConfig from '../../../@core/app.config';
import { MailAttributes } from '../interfaces';
import IConfig from '../Config';

export default (config: IConfig) => {
    return async (data: MailAttributes): Promise<boolean> => {
        try {
            const transporter = nodemailer.createTransport({
                host: AppConfig.mail.host,
                port: AppConfig.mail.port,
                auth: {
                    user: AppConfig.mail.username,
                    pass: AppConfig.mail.password
                },
                // secure: false, // true for SSL, false for STARTTLS
                // requireTLS: true,
                // tls: {
                //     // do not fail on invalid certs
                //     rejectUnauthorized: false
                // },
                // debug: AppConfig.mail.debug, // include SMTP traffic in the logs
                logger: AppConfig.mail.debug === true, // log to console
                ignoreTLS: true
            });
            const { from, to, subject, text } = data;
            const mailOptions: Mail.Options = {
                from, // sender address
                to, // list of receivers
                subject, // Subject line
                text, // plain text body
                html: text // html body
            };

            if (AppConfig.isProduction === false) {
                mailOptions.subject = `[${AppConfig.env}] - ${mailOptions.subject}`;
            }

            transporter.sendMail(mailOptions).catch((error: Error) => {
                config.logger.error({ fn: 'nodemailer', type: 'Mailer Error', error });
            });

            return true;
        } catch (error) {
            config.logger.error({ fn: 'nodemailer', type: 'Mailer Error', error });
            return false;
        }
    };
};
