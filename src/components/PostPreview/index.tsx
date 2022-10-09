import parse from 'html-react-parser';
import { PostFooter } from '../PostFooter';
import { PostPreviewProps } from './postPreview.props';
import { Button } from '../Button';

import styles from './style.module.scss';

export const PostPreview: React.FC<PostPreviewProps> = ({ title, preview, id, author, authorId, topic, createdAt }) => {
    return (
        <article className={styles.preview}>
            <h2 className={styles.preview__title}>{title}</h2>
            <div className={styles.preview__excerpt}>{parse(preview)}</div>
            <Button
                as='Link'
                to={`/posts/${id}`}
                styleType='plain'
                className={`${styles.preview__readmore} icon-readmore`}
            >
                Read more
            </Button>
            <PostFooter
                author={author}
                topic={topic}
                createdAt={createdAt}
                id={id}
                authorId={authorId} />
        </article>
    )
}
