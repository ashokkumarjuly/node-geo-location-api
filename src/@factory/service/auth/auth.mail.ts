import Config from '../Config';
import { MAIL_SUBJECT, TEMPLATE_KEYS } from '../../../constants';
import { IOptions } from '../../mail/interfaces/sendActivationEmail';
import { IOptions as ILoginSecretEmailOptions } from '../../mail/interfaces/sendLoginSecretEmail';
import { parseAndTriggerEmail } from '../commons/mail.service';
import APP_CONFIG from '../../../@core/app.config';

export const sendActivationEmail = async (config: Config, { email, user }: IOptions): Promise<boolean> => {
    const payload = {
        from: APP_CONFIG.mail.appEmails.siteEmail,
        to: email,
        subject: 'Activate Email',
        text: `Hello,
                    This is a test email.
                    Thanks,
                    Support Team`,
        isHtml: true,
        template_key: 'email-activation',
        data: user
    };

    return parseAndTriggerEmail(config, payload);
};

export const sendActivationSuccess = (config: Config, { email, user }: IOptions): Promise<boolean> => {
    const payload = {
        from: APP_CONFIG.mail.appEmails.siteEmail,
        to: email,
        subject: 'Activate Success Email',
        text: `Hello,
                    This is a test email.
                    Thanks,
                    Support Team`,
        isHtml: true,
        template_key: 'email-activation-success',
        data: user
    };

    return parseAndTriggerEmail(config, payload);
};

export const sendResetPasswordEmail = (config: Config, { email, user }: IOptions): Promise<boolean> => {
    const payload = {
        from: APP_CONFIG.mail.appEmails.siteEmail,
        to: email,
        subject: 'Reset Password Email',
        text: `Hello,
                    This is a test email.
                    Thanks,
                    Support Team`,
        isHtml: true,
        template_key: 'email-reset-password',
        data: user
    };

    return parseAndTriggerEmail(config, payload);
};

export const sendForgotPasswordEmail = (config: Config, { email, user }: IOptions): Promise<boolean> => {
    const payload = {
        from: APP_CONFIG.mail.appEmails.siteEmail,
        to: email,
        subject: 'Forgot Password Email',
        text: `Hello,
                    This is a test email.
                    Thanks,
                    Support Team`,
        isHtml: true,
        template_key: 'email-forgot-password',
        data: user
    };

    return parseAndTriggerEmail(config, payload);
};

export const sendLoginSecretEmail = (config: Config, { email, data }: ILoginSecretEmailOptions): Promise<boolean> => {
    const payload = {
        from: APP_CONFIG.mail.appEmails.siteEmail,
        to: email,
        subject: MAIL_SUBJECT.LOGIN_VERIFICATION_CODE,
        text: ``,
        isHtml: true,
        template_key: TEMPLATE_KEYS.LOGIN,
        data
    };

    return parseAndTriggerEmail(config, payload);
};
