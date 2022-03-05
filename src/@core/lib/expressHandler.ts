/* istanbul ignore file */

import { Request, Response } from 'express';

type Handler = (req: Request, res: Response) => Promise<void>;

export default Handler;

// Generic handler to send the api response
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendApiResponse = (res: Response, message: string, data?: any): Response =>
    res.json({ success: true, message, data: data || '' });
