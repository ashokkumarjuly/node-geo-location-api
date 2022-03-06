import { ICoreConfig } from '../../@core/ICoreConfig';
import { ExpressHanlder } from '../../@core/lib';
import { catchErrors, sendApiResponse } from '../../helpers';

export const checkDatabaseStatus = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'checkDatabaseStatus' });
        const result = await config.service.checkDatabaseStatus({});

        config.logger.info({ type: 'API Response', fn: 'checkDatabaseStatus', resp: 'success' });
        sendApiResponse(res, req.t('server.success.checkDatabaseStatus'), result);
    });
