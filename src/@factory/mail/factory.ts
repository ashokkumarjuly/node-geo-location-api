import facade from './facade';
import logger from '../../logger';
import APP_CONFIG from '../../@core/app.config';
import Mail from './Mail';

export default (): Mail =>
    facade({
        mailDbName: APP_CONFIG.mail.name,
        logger
    });
