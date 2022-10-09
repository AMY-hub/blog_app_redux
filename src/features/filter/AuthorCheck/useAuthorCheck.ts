import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectByAuthor, toggleSelectByAuthor } from '../filter.slice';

type UseAuthorCheck = () => [boolean, () => void];

export const useAuthorCheck: UseAuthorCheck = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectByAuthor);

    const toggleAuthorCheck = (): void => {
        dispatch(toggleSelectByAuthor());
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }

    return [checked, toggleAuthorCheck];
}