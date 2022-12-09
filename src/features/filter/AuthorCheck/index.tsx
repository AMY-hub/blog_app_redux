import cn from 'classnames';
import { useAuthorCheck } from './useAuthorCheck';

import styles from './style.module.scss';

export const AuthorCheck = () => {

    const [checked, toggleAuthorCheck] = useAuthorCheck();

    return (
        <div className={styles.myposts}>
            <label className={styles.label} htmlFor='author'>
                <input
                    id='author'
                    type='checkbox'
                    className={styles.hidden}
                    checked={checked}
                    onChange={toggleAuthorCheck}
                />
                <span className={cn(styles.check, {
                    'icon-checkmark': checked
                })}></span>
                Show my posts only
            </label>
        </div>
    );
};
