/* istanbul ignore next */
export default (sortString: string, pickableAttributes: string[] = []): string[][] =>
    sortString
        .toLowerCase()
        .split(',')
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((prev: any, curr: any) => {
            const [key, value] = curr.split(':');
            const item = [[key, value]];
            if (pickableAttributes.length > 0) {
                return pickableAttributes.includes(key) ? [...prev, ...item] : prev;
            }
            return [...prev, ...item];
        }, []);
