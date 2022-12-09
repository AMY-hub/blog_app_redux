import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ErrorMessage, Preloader } from '../../components';
import { loadDetails, selectDetails } from '../../features/details/details.slice';
import { PostDetails } from '../../features/details/PostDetails';

import styles from './style.module.scss';

export const PostDetailsPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { loading, error, post } = useAppSelector(selectDetails);

    useEffect(() => {
        if (!id) {
            navigate('/notfound');
            return;
        }
        const promise = dispatch(loadDetails(id));
        return () => promise.abort();
    }, [dispatch, id, navigate]);

    return (
        <div className={styles.wrapper}>
            {loading && <Preloader />}
            {error && <ErrorMessage text={error} />}
            {post && <PostDetails post={post} />}
        </div>
    );
};