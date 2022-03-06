/* istanbul ignore file */

import { Request, Response, NextFunction, Application } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const RATE_LIMIT = 10;

export const rateLimiterGuest = new RateLimiterMemory({
    points: 5,
    duration: 1
});
export const rateLimiterAPI = new RateLimiterMemory({
    points: 6,
    duration: 1
});

export const ApiRateLimter = (_app: Application): void => {
    _app.use(`/api/*`, (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user && req.user.id ? req.user.id : null;

        const key = userId ? +userId : req.ip;
        const pointsToConsume = userId ? RATE_LIMIT : 1;

        rateLimiterAPI
            .consume(key, pointsToConsume)
            .then(() => {
                next();
            })
            .catch(() => {
                res.status(429).send('Too Many Requests');
            });
    });
};
