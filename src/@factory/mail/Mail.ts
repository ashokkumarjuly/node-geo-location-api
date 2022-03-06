import { SendEmailSignature, SendGridSignature } from './interfaces';

export interface MailDbInterface {
    readonly nodemailer: SendEmailSignature;
    readonly sendgrid: SendGridSignature;
}

export default MailDbInterface;
