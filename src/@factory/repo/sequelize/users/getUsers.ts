import { IPagingResponse } from '../../../../lib/paginate';
import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/getUsers';
import { USER_MODEL_VISIBLE_PROPERTIES, API_ROUTE_V1 } from '../../../../constants';
import { getPagingOffset } from '../../../../helpers/util';
import { Paginate } from '../../../../lib';

export default (config: IConfig) =>
    async ({ limit, page }: IOptions): Promise<IPagingResponse> => {
        const [pLimit, pOffset] = getPagingOffset(limit, page);

        const { count, rows } = await config.models.User.findAndCountAll({
            attributes: USER_MODEL_VISIBLE_PROPERTIES,
            offset: pOffset,
            limit: pLimit
            // order,
        });

        return Paginate({
            count,
            rows,
            baseUrl: `${API_ROUTE_V1}/users`,
            offset: pOffset,
            limit: pLimit
        });
    };
