/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../../Config';
import sendgrid from '../../sendEmail/sendgrid';

export default (config: IConfig): any => {
    return {
        sendgrid: sendgrid(config)
    };
};
