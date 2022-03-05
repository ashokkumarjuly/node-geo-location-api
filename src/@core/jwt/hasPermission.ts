/* istanbul ignore file */

import { CAN_ADMINISTER } from '../../constants';
import { ForbiddenError } from '../helpers/errors';

export interface Options {
    permissionName: string;
    permissions: any[];
}

export default ({ permissions, permissionName }: Options): void => {
    if (permissions.length === 0) throw new ForbiddenError();
    const hasPermission: boolean = permissions.some((permission: any) => {
        return permission.name === permissionName || permission.name === CAN_ADMINISTER;
    });
    if (!hasPermission) throw new ForbiddenError();
};
