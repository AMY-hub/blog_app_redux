import { itemsPerPage } from '../../../app/apiConfig';
import { useAppSelector } from '../../../app/hooks';
import { ErrorMessage, PostPreview, Preloader } from '../../../components';
import { Pagination } from '../Pagination';
import { selectError, selectLoadingStatus, selectPostsCount, selectPostsList } from '../posts.slice';
import { usePagination } from '../usePagination';

import styles from './style.module.scss';

export const PostsList = () => {

    const postsList = useAppSelector(selectPostsList);
    const error = useAppSelector(selectError);
    const loadingStatus = useAppSelector(selectLoadingStatus);
    const totalCount = useAppSelector(selectPostsCount);
    const {
        currentPage,
        pagesTotalCount,
        getNextPage,
        getPrevPage,
        setPage,
        paginationRange } = usePagination(totalCount, itemsPerPage);

    if (loadingStatus === 'pending') {
        return <Preloader />;
    }

    if (error) {
        return <ErrorMessage text={error} />;
    }

    return (
        <div className={styles.postslist}>
            <section className={styles.posts}>
                {postsList.length ?
                    postsList.map(post => <PostPreview key={post.id} {...post} />)
                    :
                    <div className={styles.notfound}>No posts found. Try changing filters or refreshing the page.</div>
                }
            </section>
            {
                pagesTotalCount > 1 &&
                <Pagination
                    currentPage={currentPage}
                    pagesTotalCount={pagesTotalCount}
                    getNextPage={getNextPage}
                    getPrevPage={getPrevPage}
                    setPage={setPage}
                    paginationRange={paginationRange}
                />
            }
        </div>
    );
};
