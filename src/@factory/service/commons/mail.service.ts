/* istanbul ignore file */

import * as pug from 'pug';
import * as fs from 'fs-extra';
import Config from '../Config';
import AppConfig from '../../../@core/app.config';
import { SendGridMailAttributes } from '../../mail/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const parseAndTriggerEmail = async (config: Config, payload: SendGridMailAttributes): Promise<boolean> => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { subject, template_key, data } = payload;
    if (!template_key) {
        // Send email without templates
        await config.mail.sendgrid(payload);
    } else {
        const obj = { ...payload };

        const tplFile = `${AppConfig.mail.templatePath}/${template_key}.pug`;

        let html = '';
        let parsedSubject = subject;

        if (tplFile && (await fs.pathExists(tplFile))) {
            html = pug.renderFile(tplFile, data);
        } else {
            const dbContent = {
                subject: ``,
                body: ``
            };

            // To parse the templates with dynamic content
            parsedSubject = pug.render(dbContent.subject, data);
            html += pug.renderFile(`${AppConfig.mail.templatePath}/email.header.pug`, data);
            html += pug.render(dbContent.body, data);
            html += pug.renderFile(`${AppConfig.mail.templatePath}/email.footer.pug`, data);
        }

        obj.subject = parsedSubject;
        obj.isHtml = true;
        obj.text = html;

        await config.mail.sendgrid(obj);
    }

    return true;
};
