import { Connection } from 'mongoose';
import { Logger } from 'winston';
import { IModels } from './models';

export default interface IConfig {
    readonly mongooseInstance: Connection;
    readonly models: IModels;
    readonly logger: Logger;
}
