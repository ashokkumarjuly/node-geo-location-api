/* istanbul ignore file */

import { Request } from 'express';
import * as parseURL from 'url-parse';
import { DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT } from '../constants';
import AppConfig from '../@core/app.config';
import { isObject } from 'lodash';

const parseString = (str: string | null) => {
    if (typeof str === 'string' && str === '') return null;
    else if (typeof str === 'string' && str) return str.trim();
    else return str;
};

export const emptyStringsToNull = (obj: { [x: string]: null }): any => {
    const map: { [key: string]: string | null } = obj;

    if (map && isObject(map) && !Array.isArray(map)) {
        for (const key of Object.keys(map)) {
            map[key] = parseString(map[key]);
        }
        return map;
    } else {
        return map;
    }
};

export const toRemoveAllSpaces = (str: string): string => {
    return str && typeof str === 'string' ? str.replace(/\s+/g, '') : '';
};
export const toLowerCase = (str: string): string => {
    return str && typeof str === 'string' ? str.toLowerCase() : '';
};

export const numberPadding = (num: number, size: number): string | number => {
    if (num.toString().length >= size) return num;
    return (10 ** size + Math.floor(num)).toString().slice(1);
};

export const isEqualIgnoreCase = (val: string, othrVal: string): boolean => {
    return val.toLowerCase() === othrVal.toLowerCase();
};

export const err = (e: { errors: any; message: any; sql: any; msg: any }): string => {
    let msg;
    if (e.errors) msg = JSON.stringify(e.errors);
    else if (e.message) {
        msg = e.message;
        if (e.sql) msg += ` SQL: '${e.sql}`;
    } else if (e.msg) msg = JSON.stringify(e);
    else msg = JSON.stringify(e);
    return msg;
};

export const parseJson = (
    txt: string | any[],
    reviver: ((this: any, key: string, value: any) => any) | undefined,
    context: number
): string | any => {
    // eslint-disable-next-line unicorn/prefer-default-parameters
    context = context || 20; // eslint-disable-line no-param-reassign
    try {
        return typeof txt === 'string' && JSON.parse(txt, reviver);
    } catch (error) {
        if (typeof txt !== 'string') {
            const isEmptyArray = Array.isArray(txt) && txt.length === 0;
            const errorMessage = `Cannot parse ${isEmptyArray ? 'an empty array' : String(txt)}`;
            throw new TypeError(errorMessage);
        }

        if (error instanceof Error) {
            const syntaxErr = error.message.match(/^unexpected token.*position\s+(\d+)/i);
            // eslint-disable-next-line no-nested-ternary
            const errIdx = syntaxErr
                ? +syntaxErr[1]
                : /^unexpected end of json.*/i.test(error.message)
                ? txt.length - 1
                : null;
            if (errIdx != null) {
                const start = errIdx <= context ? 0 : errIdx - context;
                const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
                error.message += ` while parsing near '${start === 0 ? '' : '...'}${txt.slice(start, end)}${
                    end === txt.length ? '' : '...'
                }'`;
            } else {
                error.message += ` while parsing '${txt.slice(0, context * 2)}'`;
            }
        }

        throw error;
    }
};
export const getFullURLFromRequest = (req: Request): string => {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
};

export const getURLFromRequest = (req: Request, isPort = false, isObj = false): string => {
    if (isPort) {
        return `${req.protocol}://${req.get('host')}`;
    }
    let { protocol } = req;

    if (AppConfig.ENABLE_HTTPS === true) {
        protocol = protocol.replace('http', 'https');
    }
    const url = parseURL(`${protocol}://${req.get('host')}`);

    return isObj ? JSON.stringify(url) : `${url.protocol}//${url.hostname}`;
};

export const getPagingOffset = (l: number | undefined, p: number | undefined): Array<number> => {
    const limit: number = l && +l <= MAX_PAGINATION_LIMIT ? +l : DEFAULT_PAGINATION_LIMIT;
    const offset = ((p ? +p : 1) - 1) * +limit;

    return [limit, offset];
};

export const flattenArray = function* (arr: Array<any>): any {
    for (const el of arr) {
        if (Array.isArray(el)) {
            yield* flattenArray(el);
        } else {
            yield el;
        }
    }
};

export const sec2time = (timeInSeconds: number) => {
    const d = Number(timeInSeconds);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
};
