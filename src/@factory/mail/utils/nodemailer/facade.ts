import nodemailer from '../../sendEmail/nodemailer';
import IConfig from '../../Config';
export default (config: IConfig): any => {
    return {
        nodemailer: nodemailer(config)
    };
};
