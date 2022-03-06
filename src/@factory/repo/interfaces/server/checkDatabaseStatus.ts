import { AsyncHandler } from '../../../../lib';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOptions {}

export type ISignature = AsyncHandler<IOptions, boolean>;

export default ISignature;
