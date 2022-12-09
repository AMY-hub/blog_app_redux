import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as ClearIcon } from './clear.svg';
import { useSearch } from './useSearch';

import styles from './style.module.scss';

export const Search = () => {

    const [handleChange, handleReset] = useSearch();

    return (
        <form
            className={styles.search}
        >
            <SearchIcon width={22} height={22} />
            <input
                placeholder='Search...'
                type="search"
                className={styles.search__field}
                onChange={handleChange} />
            <button
                type='reset'
                className={styles.clear__btn}
                onClick={handleReset}
            >
                <ClearIcon width={18} height={18} />
            </button>
        </form>
    );
};
