import { Address, Attachment } from 'nodemailer/lib/mailer';
import { AsyncHandler } from '../../../lib';

export interface MailAttributes {
    /** The e-mail address of the sender. All e-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>' */
    from?: string | Address;
    /** An e-mail address that will appear on the Sender: field */
    sender?: string | Address;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
    to?: string | Address | Array<Address>;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
    cc?: string | Address | Array<Address>;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
    bcc?: string | Address | Array<string | Address>;
    /** The subject of the e-mail */
    subject?: string;
    text: string;
    isHtml: boolean;
    template_key?: string;
    data?: string | string[] | Record<string, unknown> | any;
    attachments?: Attachment[];
}

type ISignature = AsyncHandler<MailAttributes, boolean>;

export default ISignature;
