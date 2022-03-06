import { AsyncHandler } from '../../../../lib';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOptions {
    readonly limit?: number;
    readonly addressdetails: number;
    readonly product?: string | null;
    readonly filter: {
        format: string;
        addressdetails: number;
        street: string;
        town: string;
        postalcode: string;
        country: string;
        city?: string;
        state?: string;
    };
}

export type ISignature = AsyncHandler<IOptions, Record<string, any> | null>;

export default ISignature;
