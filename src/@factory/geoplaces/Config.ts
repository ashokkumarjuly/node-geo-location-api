import { Logger } from 'winston';

export default interface Config {
    readonly logger: Logger;
}
