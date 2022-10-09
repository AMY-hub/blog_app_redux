import { useAppSelector } from '../../app/hooks';
import { PostsList } from '../../features/posts/PostsList';
import { Button, FilterPanel } from '../';
import { selectAccessToken } from '../../features/user/user.slice';

import styles from './style.module.scss';

export const PostsSection = () => {

    const token = useAppSelector(selectAccessToken);

    return (
        <section className={styles.posts_section}>
            <FilterPanel />
            {
                token &&
                <div className={styles.posts_section__header}>
                    <Button
                        as='Link'
                        to='/newpost'
                        size='s'
                    >New post</Button>
                </div>
            }
            <PostsList />
        </section>
    )
}
