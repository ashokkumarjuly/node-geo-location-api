import { Logger } from 'winston';

export default interface Config {
    readonly mailDbName: string;
    readonly logger: Logger;
}
