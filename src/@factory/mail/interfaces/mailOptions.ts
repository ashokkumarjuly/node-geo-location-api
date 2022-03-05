import { Attachment } from 'nodemailer/lib/mailer';
import { AsyncHandler } from '../../../lib';

export interface SendGridMailAttributes {
    /** The e-mail address of the sender. All e-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>' */
    from: string;
    /** An e-mail address that will appear on the Sender: field */
    sender?: string;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
    to: string | Array<string>;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
    cc?: string | Array<string>;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
    bcc?: string | Array<string>;
    /** The subject of the e-mail */
    subject?: string;
    text: string;
    isHtml: boolean;
    template_key?: string;
    data?: string | string[] | Record<string, unknown> | any;
    attachments?: Attachment[];
}

type ISignature = AsyncHandler<SendGridMailAttributes, boolean>;

export default ISignature;
