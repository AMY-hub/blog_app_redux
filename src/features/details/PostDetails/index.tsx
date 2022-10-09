import parse from 'html-react-parser';
import { PostFooter } from '../../../components';
import { PostDetailsProps } from './postDetails.types';

import styles from './style.module.scss';

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
    return (
        <article className={styles.post}>
            <h2 className={styles.post__title}>{post.title}</h2>
            <div className={styles.post__body}>{parse(post.body)}</div>
            <PostFooter
                author={post.author}
                topic={post.topic}
                createdAt={post.createdAt}
                id={post.id}
                authorId={post.authorId} />
        </article>
    )
}
