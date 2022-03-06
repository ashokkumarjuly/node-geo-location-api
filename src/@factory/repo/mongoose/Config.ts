import mongoose from 'mongoose';
import { Logger } from 'winston';
import { IModels } from './models';

export default interface IConfig {
    readonly mongooseInstance: Promise<typeof mongoose>;
    readonly models: IModels;
    readonly logger: Logger;
}
