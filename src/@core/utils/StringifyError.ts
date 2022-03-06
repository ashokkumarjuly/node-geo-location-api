export default (err: { [x: string]: any }) => {
    const plainObject: any = {};
    for (const key of Object.getOwnPropertyNames(err)) {
        plainObject[key] = err[key];
    }
    return JSON.stringify(plainObject);
};
