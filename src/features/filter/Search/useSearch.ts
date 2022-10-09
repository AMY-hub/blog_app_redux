import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSearch, setSearch } from '../filter.slice';

type UseSearch = () => [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

export const useSearch: UseSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchString = e.target.value;
        dispatch(setSearch(searchString));
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }

    const handleReset = (): void => {
        dispatch(setSearch(''));
    }

    return [search, handleChange, handleReset];
}