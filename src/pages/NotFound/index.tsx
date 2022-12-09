import { Button } from '../../components';

import styles from './style.module.scss';

export const NotFound = () => {

    return (
        <div className={styles.notfound}>
            <h2>Ooops!</h2>
            <p>This page doesn't exist.</p>
            <Button
                as='Link'
                to='/'
                styleType='light'
                size='l'
            >
                Go to homepage
            </Button>
        </div>
    );
};