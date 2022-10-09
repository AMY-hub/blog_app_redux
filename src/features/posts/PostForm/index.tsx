import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAccessToken, selectUserData } from '../../user/user.slice';
import { selectError, selectPublicationStatus } from '../posts.slice';

import { validateFormData } from '../../../utils/validatePostData';
import { successAlert } from '../../../utils/notification';
import { Button, CustomSelect, ErrorMessage, TextEditor } from '../../../components';
import { PostFormData } from '../../../types';
import { PostFormProps } from './postForm.props';
import { OptionsMap } from '../posts.types';

import styles from './style.module.scss';
import { createPost, updatePost } from '../posts.actions';

export const PostForm: React.FC<PostFormProps> = ({ postForEdit }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAccessToken);
    const user = useAppSelector(selectUserData);
    const status = useAppSelector(selectPublicationStatus);
    const error = useAppSelector(selectError);

    const [title, setTitle] = useState(postForEdit ?
        postForEdit.title : '');
    const [bodyHTML, setBodyHTML] = useState(postForEdit ?
        postForEdit.body : '');
    const [previewHTML, setPreviewHTML] = useState(postForEdit ?
        postForEdit.preview : '');
    const [topic, setTopic] = useState(postForEdit ?
        postForEdit.topic : null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const optionsMap: OptionsMap = {
        'html': { value: 'html', label: 'HTML' },
        'css': { value: 'css', label: 'CSS' },
        'javascript': { value: 'javascript', label: 'JavaScript' }
    };

    const options = Object.values(optionsMap);

    const successFn = ({ id }: { id: number }): void => {
        navigate(`/posts/${id}`);
        successAlert('Post was successfully published!');
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!user || !token) {
            navigate('/login');
            return;
        }

        setValidationError(null);
        const post = {
            title: title,
            body: bodyHTML,
            preview: previewHTML,
            topic,
            author: user.name,
            authorId: user.id
        } as PostFormData;
        const validate = validateFormData(post);
        if (validate.invalid) {
            setValidationError('Fill in all fields!');
            return;
        }
        if (postForEdit) {
            dispatch(updatePost({
                token,
                id: postForEdit.id,
                data: post
            })).unwrap()
                .then(successFn)
                .catch((err: Error) => console.log(err.message));
        } else {
            dispatch(createPost({ token, data: post })).unwrap()
                .then(successFn)
                .catch((err: Error) => console.log(err.message));
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__fields}>
                <label htmlFor='title' className={styles.form__name}>
                    Title of your post:
                </label>
                <input type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Your title here'
                    className={styles.form__title}
                />
                <h3 className={styles.form__name}>Your post's preview:</h3>
                <TextEditor
                    type='preview'
                    HTML={previewHTML}
                    setHTML={setPreviewHTML}
                    limit={550}
                />
                <h3 className={styles.form__name}>Text of your post:</h3>
                <TextEditor
                    type='full'
                    className={styles.form__text}
                    HTML={bodyHTML}
                    setHTML={setBodyHTML}
                />
                <CustomSelect
                    title='Choose theme:'
                    options={options}
                    value={topic ? optionsMap[topic] : null}
                    onChange={(e) => setTopic(e?.value ?? null)}
                />
            </div>
            {validationError &&
                <ErrorMessage text={validationError} />
            }
            {error &&
                <ErrorMessage text={error} />
            }
            <Button
                as='button'
                withLoading={true}
                loading={status === 'pending'}
                size='l'
                styleType='light'
                className={styles.form__submit}>
                Publish
            </Button>
        </form>
    )
}
