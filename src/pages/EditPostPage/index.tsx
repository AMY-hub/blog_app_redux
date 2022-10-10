import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadDetails, selectDetails } from '../../features/details/details.slice';
import { selectAccessToken } from '../../features/user/user.slice';
import { PostForm } from '../../features/posts/PostForm';
import { deletePost } from '../../features/posts/posts.actions';
import { selectError } from '../../features/posts/posts.slice';
import { successAlert } from '../../utils/notification';
import { Button, ErrorMessage, Preloader, Modal } from '../../components';

import styles from './style.module.scss';

export const EditPostPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const error = useAppSelector(selectError);
    const { error: loadingError, loading, post } = useAppSelector(selectDetails);
    const token = useAppSelector(selectAccessToken);

    useEffect(() => {
        if (!id || !token) {
            navigate('/login');
            return;
        }

        if (!post || post.id !== +id) {
            dispatch(loadDetails(id));
        }
    }, [id, dispatch, navigate, post, token])

    const handleConfirm = (onClose: () => void) => {
        onClose();
        if (!id || !token) {
            return;
        }
        dispatch(deletePost({ id: +id, token }))
            .then(() => {
                navigate('/');
                successAlert('Post was successfully deleted.');
            })
            .catch((err: Error) => console.log(err.message));
    }

    const handleDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Modal
                        onClose={onClose}
                        callback={handleConfirm}
                    >
                        'Do you really want to delete this post?'
                    </Modal>
                );
            }
        });
    }

    return (
        <>
            {loading && <Preloader />}
            {loadingError && <ErrorMessage text={loadingError} />}
            {error && <ErrorMessage text={error} />}
            {post &&
                <div className={styles.editform_container}>
                    <Button
                        as='button'
                        styleType='ghost'
                        onClick={handleDelete}
                        className={styles.delete_btn}
                    >
                        Delete post
                    </Button>
                    <PostForm
                        postForEdit={post}
                    />
                </div>
            }
        </>
    )
}
