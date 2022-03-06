import { AsyncHandler } from '../../../../lib';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOptions {
    readonly product: string;
    readonly lon: number;
    readonly lat: number;
}

export type ISignature = AsyncHandler<IOptions, Record<string, any> | null>;

export default ISignature;
