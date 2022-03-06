/* istanbul ignore file */

import { Request, Response } from 'express';

type Handler = (req: Request, res: Response) => Promise<void>;

export default Handler;

// Generic handler to send the api response
export const sendApiResponse = (
    res: Response,
    message: string,
    data?: Array<string> | string | any,
    code?: number
): Response => {
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({ success: true, message, body: data || '' });
};
