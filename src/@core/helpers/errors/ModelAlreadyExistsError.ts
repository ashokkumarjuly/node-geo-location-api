import BaseError from './BaseError';

export default class extends BaseError {
    public readonly modelName: string;

    public constructor(modelName = '') {
        super();
        this.modelName = modelName;
    }
}
