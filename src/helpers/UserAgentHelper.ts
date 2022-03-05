/* istanbul ignore file */

import { Request } from 'express';
import * as parser from 'ua-parser-js';

class UserAgentHelper {
    /**
     *
     * @param req - Request
     */
    public static currentDevice(req: Request): string | null {
        const useragent = parser(req.headers['user-agent']);
        if (useragent) {
            return `Model:${useragent.device?.model} - Type:${useragent.device?.type} - Vendor:${useragent.device?.vendor}`;
        }

        return null;
    }

    public static currentDeviceType(req: Request): string | null {
        const useragent = parser(req.headers['user-agent']);

        if (useragent && useragent.device && useragent.device.type) {
            return useragent.device.type;
        }

        return null;
    }
}

export default UserAgentHelper;
