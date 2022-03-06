import { ExpressHanlder } from '../../../@core/lib';
import { ICoreConfig } from '../../../@core/ICoreConfig';
// import { IRequestUser } from '../../../@core/app.config/interface';
import { catchErrors, sendApiResponse } from '../../../helpers';
// import { getURLFromRequest } from '../../../helpers/util';

export const getGeoPlace = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const { filter, addressdetails }: any = req.query;

        config.logger.info({ type: 'API request', fn: 'getGeoPlace', query: req.query });

        const result = await config.service.getGeoPlace({ filter, addressdetails });

        config.logger.info({
            type: 'API Response',
            fn: 'getGeoPlace',
            resp: 'success',
            result: result ? result.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });

export const getWeatherByGeoPlace = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const { filter, addressdetails, product }: any = req.query;

        config.logger.info({ type: 'API request', fn: 'getWeatherByGeoPlace', query: req.query });

        const result = await config.service.getWeatherByGeoPlace({ filter, product, addressdetails });

        config.logger.info({
            type: 'API Response',
            fn: 'getWeatherByGeoPlace',
            resp: 'success',
            result: result ? result.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });
