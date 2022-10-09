export interface PaginationProps {
    currentPage: number,
    pagesTotalCount: number,
    getNextPage: () => void,
    getPrevPage: () => void,
    setPage: (n: number) => void,
    paginationRange: Array<number | '...'>
}