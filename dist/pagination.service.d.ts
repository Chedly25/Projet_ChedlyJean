export interface PaginatedType<T> {
    data: T[];
    page: number;
    total: number;
}
export declare class PaginationService {
    private readonly defaultPage;
    private readonly defaultSize;
    paginatedData<T>(data: T[], page: number | string | undefined, size: number | string | undefined): PaginatedType<T>;
    private static getAsNumberOrDefault;
}
