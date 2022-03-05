import { ExpressHanlder } from '../../../@core/lib';
import { ICoreConfig } from '../../../@core/ICoreConfig';
// import { IRequestUser } from '../../../@core/app.config/interface';
import { catchErrors, sendApiResponse } from '../../../helpers';
// import { getURLFromRequest } from '../../../helpers/util';

export const getGeoAddress = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const { filter, limit, addressdetails }: any = req.query;

        config.logger.info({ type: 'API request', fn: 'getGeoAddress', query: req.query });

        const result = await config.service.getGeoAddress({ filter, limit, addressdetails });

        config.logger.info({
            type: 'API Response',
            fn: 'getGeoAddress',
            resp: 'success',
            result: result ? result.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });

export const getWeatherByGeoAddress = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const { filter, limit, addressdetails, product }: any = req.query;

        config.logger.info({ type: 'API request', fn: 'getWeatherByGeoAddress', query: req.query });

        const result = await config.service.getWeatherByGeoAddress({ filter, limit, product, addressdetails });

        config.logger.info({
            type: 'API Response',
            fn: 'getWeatherByGeoAddress',
            resp: 'success',
            result: result ? result.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });
