import { ExpressHanlder } from '../../@core/lib';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { catchErrors, sendApiResponse, UserAgentHelper } from '../../helpers';
import { getURLFromRequest } from '../../helpers/util';

export const loginSecret = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'loginSecret', data: null });
        const { email, isResend } = req.body;
        const successMessage: string = isResend ? 'auth.success.resendLoginSecret' : 'auth.success.loginSecret';

        const expiresIn = await config.service.loginSecret({ email });

        config.logger.info({
            type: 'API Response',
            fn: 'loginSecret',
            resp: 'success',
            useragent: UserAgentHelper.currentDevice(req)
        });

        sendApiResponse(res, req.t(successMessage, { expiresIn }), true);
    });

export const login = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'login', data: null });
        const domainURL = getURLFromRequest(req);
        const { email, code } = req.body;

        const { user, token, refreshToken } = await config.service.login({ email, code, domainURL });
        config.logger.info({ type: 'API Response', fn: 'login', resp: 'success' });

        sendApiResponse(res, req.t('auth.success.login'), {
            user,
            token,
            refreshToken,
            useragent: UserAgentHelper.currentDevice(req)
        });
    });

export const getTokenByRefreshToken = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'getTokenByRefreshToken', data: null });
        const { refreshToken } = req.body;

        const { token } = await config.service.getTokenByRefreshToken({ refreshToken });
        config.logger.info({
            type: 'API Response',
            fn: 'getTokenByRefreshToken',
            resp: 'success',
            useragent: UserAgentHelper.currentDevice(req)
        });

        sendApiResponse(res, req.t(''), { token });
    });
