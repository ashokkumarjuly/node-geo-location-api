/* eslint-disable @typescript-eslint/naming-convention */
import { createClient } from 'redis';
import { Logger } from 'winston';

// Establish Redis connection
let _redisClient: any = null;

export function redisClient({ logger }: { logger: Logger }): { createClient(uri: string): any; close(): void } {
    return {
        createClient(uri: string) {
            if (!_redisClient) {
                _redisClient = createClient({
                    url: uri
                });

                _redisClient.connect();

                _redisClient
                    .on('connect', () => {
                        logger.info('Redis connected successfully');
                    })
                    .on('ready', () => {
                        logger.info('Redis is ready');
                    })
                    .on('error', (error: any) => {
                        console.error('Redis error', error);
                    })
                    .on('close', () => {
                        logger.info('Redis close');
                    })
                    .on('reconnecting', () => {
                        logger.info('Redis reconnecting');
                    })
                    .on('end', () => {
                        logger.info('Redis end');
                    });
            }
            return _redisClient;
        },
        close(): void {
            if (_redisClient) {
                _redisClient.disconnect();
            }
        }
    };
}

export default redisClient;
