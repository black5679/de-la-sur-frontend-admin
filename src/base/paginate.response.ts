export interface PaginateResponse<T>{
    results: T[],
    totalRows: number,
    totalPages: number
}