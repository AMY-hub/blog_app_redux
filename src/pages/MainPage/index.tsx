import { PostsSection } from '../../components';

import styles from './style.module.scss';

export const MainPage = () => {
    return (
        <main className={styles.main}>
            <PostsSection />
        </main>
    );
};
