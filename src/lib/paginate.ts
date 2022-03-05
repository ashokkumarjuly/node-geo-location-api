/* istanbul ignore file */
export interface IPagingOptions {
    baseUrl: string;
    rows: Array<string | any>;
    count: number;
    offset: number;
    limit: number;
}

export interface IPagingResponse {
    count: number;
    data: Array<string> | string | Record<string, unknown>;
    _paging: {
        links: any;
        row_count: number;
        no_of_pages: number;
        per_page: number;
        first_page: number;
        current_page: number;
        last_page: number;
    };
}

const getPages = (total = 0, limit = 1) => (total <= 1 ? 1 : Math.ceil(total / limit));

const getCurrentPage = (offset: number, limit: number): number => Math.ceil(offset / limit) + 1;

export interface GetLinksOptions {
    baseUrl: string;
    limit: number;
    numberOfPages: number;
    currentPage: number;
}

const getLinks = ({ baseUrl, limit, currentPage, numberOfPages }: GetLinksOptions): any => {
    const lastPage = numberOfPages;
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    const page = 1;
    return {
        first: `${baseUrl}?page=${page}&limit=${limit}`,
        last: numberOfPages > 1 ? `${baseUrl}?page=${lastPage}&limit=${limit}` : null,
        prev: currentPage - 1 > 0 ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null,
        next: currentPage + 1 <= numberOfPages ? `${baseUrl}?page=${nextPage}&limit=${limit}` : null,
        self: `${baseUrl}?page=${currentPage}&limit=${limit}`,
        baseUrl
    };
};

/* istanbul ignore next */
export default (options: IPagingOptions): IPagingResponse => {
    const { baseUrl, count, limit, offset, rows } = options;

    const numberOfPages: number = getPages(count, limit);

    const rowCount: number = rows.length;
    const currentPage: number = getCurrentPage(offset, limit);

    return {
        count,
        data: rows,
        _paging: {
            links: getLinks({ baseUrl, limit, numberOfPages, currentPage }),
            first_page: 1,
            current_page: currentPage,
            last_page: numberOfPages,
            no_of_pages: numberOfPages,
            per_page: limit,
            row_count: rowCount
        }
    };
};
