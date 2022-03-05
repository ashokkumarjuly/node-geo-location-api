type AsyncHandler<IOptions, Response> = (opts: IOptions) => Promise<Response>;

export default AsyncHandler;
