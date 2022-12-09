import { useSetFilter } from './useSetFilter';
import { OptionsMap } from '../filter.types';
import { CustomSelect } from '../../../components';

export const FilterSelect = (): JSX.Element => {

    const [filter, setFilter] = useSetFilter();

    const optionsMap: OptionsMap = {
        'all': { value: 'all', label: 'All posts' },
        'html': { value: 'html', label: 'About HTML' },
        'css': { value: 'css', label: 'About CSS' },
        'javascript': { value: 'javascript', label: 'About JavaScript' }
    };

    const options = Object.values(optionsMap);

    return (
        <CustomSelect
            title='Select topic:'
            options={options}
            value={optionsMap[filter] || optionsMap.all}
            onChange={setFilter}
        />
    );
};
