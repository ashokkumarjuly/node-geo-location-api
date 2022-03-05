import { IGetRecord, ISetRecord } from './interface';

export default interface Redis {
    readonly get: IGetRecord;
    readonly set: ISetRecord;
    readonly setex: ISetRecord;
}
