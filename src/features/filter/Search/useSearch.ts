import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { debounce } from '../../../utils/debounce';
import { setSearch } from '../filter.slice';

type UseSearch = () => [(e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

export const useSearch: UseSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchString = e.target.value;
        dispatch(setSearch(searchString));
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    handleChange = debounce(handleChange, 500);

    const handleReset = (): void => {
        dispatch(setSearch(''));
    };

    return [handleChange, handleReset];
};