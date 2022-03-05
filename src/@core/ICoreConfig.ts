import { Logger } from 'winston';
import { Application } from 'express';
import Service from '../@factory/service/Service';

export interface ICoreConfig {
    readonly service: Service;
    readonly logger: Logger;
    readonly app: Application;
}
