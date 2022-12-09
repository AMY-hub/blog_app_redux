import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectByAuthor, selectOrder, selectSearch, selectTopicFilter } from '../filter/filter.slice';
import { selectUserData } from '../user/user.slice';
import { loadPosts } from './posts.actions';
import { selectCurrentPage } from './posts.slice';
import { LoadedPostsParams } from './posts.types';

type UsePaginationHook = (totalCount: number, itemsPerPage: number) => {
    currentPage: number,
    pagesTotalCount: number,
    getNextPage: () => void,
    getPrevPage: () => void,
    setPage: (n: number) => void,
    paginationRange: Array<number | '...'>
};

export const usePagination: UsePaginationHook = (totalCount, itemsPerPage) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromQuery = parseInt(searchParams.get('page') || '');
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(selectCurrentPage);
    const filter = useAppSelector(selectTopicFilter);
    const order = useAppSelector(selectOrder);
    const byAuthor = useAppSelector(selectByAuthor);
    const search = useAppSelector(selectSearch);
    const user = useAppSelector(selectUserData);

    useEffect(() => {
        const loadedPostsParams: LoadedPostsParams = {
            order,
            page: pageFromQuery || currentPage,
            filter,
            authotId: (byAuthor && user?.id) ? user.id : undefined,
            search
        };
        dispatch(loadPosts(loadedPostsParams));
    }, [dispatch, filter, order, byAuthor, search, pageFromQuery, currentPage, user?.id]);

    const pagesTotalCount = Math.ceil(totalCount / itemsPerPage);

    const range = (start: number, end: number): number[] => {
        const rangeArr: number[] = [];
        for (let i = start; i <= end; i++) {
            rangeArr.push(i);
        }
        return rangeArr;
    };

    const paginationRange: Array<number | '...'> = useMemo(() => {
        if (pagesTotalCount <= 5) {
            return range(1, pagesTotalCount);
        }

        const dots = '...';
        const maxRightVisible = pagesTotalCount - 2;
        const maxLeftVisible = 3;

        if (currentPage > maxLeftVisible && currentPage < maxRightVisible) {
            return [1, dots, ...range(currentPage - 1, currentPage + 1), dots, pagesTotalCount];
        }

        if (currentPage <= maxLeftVisible) {
            return [...range(1, maxLeftVisible + 1), dots, pagesTotalCount];
        }

        if (currentPage >= maxRightVisible) {
            return [1, dots, ...range(maxRightVisible - 1, pagesTotalCount)];
        }

        return range(1, pagesTotalCount);
    }, [pagesTotalCount, currentPage]);

    const getNextPage = (): void => {
        if (currentPage >= pagesTotalCount) {
            return;
        } else {
            dispatch(loadPosts({ order, page: currentPage + 1, filter }));
            searchParams.set('page', `${currentPage + 1}`);
            setSearchParams(searchParams);
        }
    };
    const getPrevPage = (): void => {
        if (currentPage <= 1) {
            return;
        } else {
            dispatch(loadPosts({ order, page: currentPage - 1, filter }));
            searchParams.set('page', `${currentPage - 1}`);
            setSearchParams(searchParams);
        }
    };

    const setPage = (n: number) => {
        if (n > pagesTotalCount) {
            dispatch(loadPosts({ order, page: pagesTotalCount, filter }));
        } else if (n < 1) {
            dispatch(loadPosts({ order, page: 1, filter }));
        } else {
            dispatch(loadPosts({ order, page: n, filter }));
        }
        searchParams.set('page', `${n}`);
        setSearchParams(searchParams);
    };

    return { currentPage, pagesTotalCount, getNextPage, getPrevPage, setPage, paginationRange };
};