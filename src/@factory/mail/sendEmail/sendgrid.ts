/* istanbul ignore file */

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import AppConfig from '../../../@core/app.config';
import { SendGridMailAttributes } from '../interfaces';
import IConfig from '../Config';

export default (config: IConfig) => {
    return async (data: SendGridMailAttributes): Promise<boolean> => {
        try {
            if (AppConfig.mail.enabled !== true) {
                return false;
            }
            if (AppConfig.isTest) {
                return true;
            }
            if (!AppConfig.mail.sendGridApiKey) {
                config.logger.error({ fn: 'sendgrid', type: 'Service Error', err: 'sendGridApiKey is missing.' });
                return true;
            }

            const { from, to, subject, text, bcc, cc } = data;
            sgMail.setApiKey(AppConfig.mail.sendGridApiKey);
            const mailOptions: MailDataRequired = {
                to,
                from,
                subject,
                text,
                html: text
            };

            if (Array.isArray(cc) && cc.length > 0) {
                mailOptions.cc = cc;
            }
            if (Array.isArray(bcc) && bcc.length > 0) {
                mailOptions.bcc = bcc;
            }

            if (AppConfig.isProduction === false) {
                mailOptions.subject = `[${AppConfig.env}] - ${mailOptions.subject}`;
            }

            await sgMail.send(mailOptions).then(
                () => {
                    // no action needed.
                },
                (error) => {
                    if (error.response) {
                        config.logger.error({
                            fn: 'sendgrid',
                            type: 'Service Error',
                            err: JSON.stringify(error.response.body)
                        });
                    }
                }
            );

            return true;
        } catch (error) {
            config.logger.error({ fn: 'sendgrid', type: 'Service Error', error });
            return false;
        }
    };
};
