import { useSearchParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Filter } from '../../../types';
import { selectTopicFilter, changeTopicFilter } from '../filter.slice';
import { OptionType } from '../filter.types';

type UseSetFilterHook = () => [Filter, (opt: SingleValue<OptionType>) => void];

export const useSetFilter: UseSetFilterHook = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectTopicFilter);
    const [searchParams, setSearchParams] = useSearchParams();

    const setFilter = (opt: SingleValue<OptionType>) => {
        if (opt?.value) {
            searchParams.set('filter', opt.value);
            setSearchParams(searchParams);
            searchParams.set('page', '1');
            setSearchParams(searchParams);
            dispatch(changeTopicFilter(opt.value));
        }
    };

    return [filter, setFilter];
};