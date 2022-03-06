/* istanbul ignore file */

import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractTokenFromRequestSignature, createExtractTokenFromRequest } from './extractTokenFromRequest';

import APP_CONFIG from '../app.config';

interface IOptions {
    readonly req: Request;
    readonly extractTokenFromRequest?: ExtractTokenFromRequestSignature;
    readonly service: any;
    readonly secretOrKey?: string | Buffer;
}

interface AuthData {
    readonly user: any;
    readonly permissions: any[];
}

const extractTokenFromRequest = createExtractTokenFromRequest();

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default async (options: IOptions): Promise<AuthData> => {
    try {
        const tokenExtractor = options.extractTokenFromRequest || extractTokenFromRequest;
        const token: any = tokenExtractor({ req: options.req });
        const secret = options.secretOrKey || APP_CONFIG.jwt.secretAccessToken;
        const { data }: any = jwt.verify(token, secret);

        const user: any = await options.service.getUserById({ uid: data.uid });
        const permissions: any[] = await options.service.getUserPermissions({ userId: user.id });

        return await Promise.resolve({ user, permissions });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new TypeError('Invalid JWT Token');
        } else if (error instanceof jwt.NotBeforeError) {
            throw new TypeError('Invalid JWT Token');
        } else if (error instanceof jwt.TokenExpiredError) {
            throw new TypeError('Expired JWT Token');
        }
        throw error;
    }
};
