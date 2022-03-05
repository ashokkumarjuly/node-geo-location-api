// import { CAN_CREATE_USER, CAN_DELETE_USER, CAN_GET_USER, CAN_GET_USERS } from '../../../constants';
// import { getAuthUserAndPermissions, hasPermission } from '../../../@core/jwt';
import { ExpressHanlder } from '../../../@core/lib';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { IRequestUser } from '../../../@core/app.config/interface';
import { catchErrors, sendApiResponse } from '../../../helpers';
import { getURLFromRequest } from '../../../helpers/util';

export const createUser = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const payload = req.body;

        // const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        // hasPermission({ permissions, permissionName: CAN_CREATE_USER });

        config.logger.info({ type: 'API request', fn: 'createUser', user_id: payload.email });

        const user = await config.service.createUser(payload);

        config.logger.info({ type: 'API Response', fn: 'createUser', resp: 'success', user: user.id });
        sendApiResponse(res, req.t('user.success.createUser'), user);
    });

export const getUserById = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { uid } = req.params;
        const domainURL = getURLFromRequest(req);
        config.logger.info({ type: 'API request', fn: 'getUserById', uid });
        // const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        // hasPermission({ permissions, permissionName: CAN_GET_USER });

        const result = await config.service.getUserById({ uid, domainURL });
        delete result.id;

        config.logger.info({ type: 'API Response', fn: 'getUserById', resp: 'success', uid });
        sendApiResponse(res, req.t('general.success.list'), result);
    });

export const getUsers = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const { limit, page, sort }: any = req.query;
        const domainURL = getURLFromRequest(req);
        config.logger.info({ type: 'API request', fn: 'getUsers', query: req.query });

        // const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        // hasPermission({ permissions, permissionName: CAN_GET_USERS });

        const users = await config.service.getUsers({
            limit: +limit,
            page: +page,
            order: sort,
            domainURL
        });

        config.logger.info({
            type: 'API Response',
            fn: 'getUsers',
            resp: 'success',
            users: users ? users.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), users);
    });

export const showMe = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        const { id, uid } = loggedInUser;
        const domainURL = getURLFromRequest(req);

        config.logger.info({ type: 'API request', fn: 'showMe', userId: id });

        // const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        // hasPermission({ permissions, permissionName: CAN_GET_USER });

        const result = await config.service.getUserById({ id, uid, domainURL });

        delete result.id;

        config.logger.info({ type: 'API Response', fn: 'showMe', resp: 'success', uid });
        sendApiResponse(res, req.t('general.success.list'), result);
    });

export const updateUser = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const payload = req.body;
        const { uid } = req.params;
        // payload.user_id = req.params.id;
        const loggedInUser = req.user as IRequestUser;
        const domainURL = getURLFromRequest(req);

        config.logger.info({
            type: 'API request',
            fn: 'updateUser',
            currentUser: loggedInUser.id,
            data: JSON.stringify(payload)
        });

        // const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        // hasPermission({ permissions, permissionName: CAN_GET_USER });

        const user = await config.service.updateUser({ uid, data: payload, loggedInUser, domainURL });

        config.logger.info({
            type: 'API Response',
            fn: 'updateUser',
            resp: 'success',
            user: user.id
        });
        sendApiResponse(res, req.t('user.success.updateUser'), user);
    });
