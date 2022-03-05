/* istanbul ignore file */
export default class BaseError implements Error {
    public readonly name: string;

    public message: string;

    public lang_key!: string;

    public lang_key_var!: Record<string, string>;

    public readonly stack?: string;

    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(message: object | string = 'Error') {
        this.message = message instanceof Object ? JSON.stringify(message) : message;

        this.name = (<any>this.constructor).name;
        this.stack = new Error(this.message).stack;
    }
}
