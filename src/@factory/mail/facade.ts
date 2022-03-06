import IConfig from './Config';
import Mail, { MailDbInterface } from './Mail';
import nodeMailerDb from './utils/nodemailer/facade';
import sendgrid from './utils/sendgrid/facade';

const mailDbFactory = (config: IConfig): MailDbInterface => {
    switch (config.mailDbName) {
        default:
        case 'sendgrid':
            return sendgrid(config);
            break;
        case 'nodemailer':
            return nodeMailerDb(config);
            break;
    }
};

export default (config: IConfig): Mail => {
    return {
        ...mailDbFactory(config)
    };
};
