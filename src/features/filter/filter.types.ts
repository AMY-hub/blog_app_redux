import { Filter } from '../../types';

export type FilterState = {
    topicFilter: Filter,
    order: Order,
    selectByAuthor: boolean,
    search: string
};

export type Order = 'asc' | 'desc';

export type OptionType = {
    value: Filter,
    label: string
};

export type OptionsMap = {
    [Property in Filter]: OptionType
};

