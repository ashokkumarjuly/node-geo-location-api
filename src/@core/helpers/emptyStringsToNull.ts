/* istanbul ignore file */

import { Request, Response, NextFunction } from 'express';
import { isObject } from 'lodash';

const parseString = (str: string | null) => {
    if (typeof str === 'string' && str === '') return null;
    else if (typeof str === 'string' && str) return str.trim();
    else return str;
};

export default (req: Request, res: Response, next: NextFunction) => {
    const map: { [key: string]: string | null } = req.body;

    if (map && isObject(map) && !Array.isArray(map)) {
        for (const key of Object.keys(map)) {
            map[key] = parseString(map[key]);
        }
        next();
    } else {
        next();
    }
};
