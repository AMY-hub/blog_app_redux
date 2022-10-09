import { GroupBase, OptionsOrGroups, PropsValue, SingleValue } from 'react-select';

export interface CustomSelectProps<E extends { label: string, value: string }> {
    title: string;
    options: OptionsOrGroups<E, GroupBase<E>>;
    onChange: (opt: SingleValue<E>) => void;
    value: PropsValue<E> | null;
}