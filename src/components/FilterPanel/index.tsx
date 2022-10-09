import { useAppSelector } from '../../app/hooks';
import { AuthorCheck } from '../../features/filter/AuthorCheck';
import { FilterSelect } from '../../features/filter/FilterSelect'
import { OrderToggle } from '../../features/filter/OrderToggle'
import { Search } from '../../features/filter/Search';
import { selectAccessToken } from '../../features/user/user.slice';

import styles from './style.module.scss';

export const FilterPanel = () => {

    const token = useAppSelector(selectAccessToken);

    return (
        <div className={styles.filter_panel}>
            <Search />
            <FilterSelect />
            {token && <AuthorCheck />}
            <OrderToggle />
        </div>
    )
}
