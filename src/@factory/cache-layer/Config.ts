import { Logger } from 'winston';

export default interface Config {
    readonly client: any;
    readonly logger: Logger;
}
