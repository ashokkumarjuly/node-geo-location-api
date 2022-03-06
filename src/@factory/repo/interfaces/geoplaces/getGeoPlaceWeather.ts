import { AsyncHandler } from '../../../../lib';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOptions {
    readonly lat: number;
    readonly lon: number;
}

export type ISignature = AsyncHandler<IOptions, Record<string, any> | null>;

export default ISignature;
