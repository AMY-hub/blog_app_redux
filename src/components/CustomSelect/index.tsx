import Select, { StylesConfig } from 'react-select';
import { CustomSelectProps } from './customSelect.props';

import styles from './style.module.scss';

export function CustomSelect<E extends { value: string, label: string }>({ title, options, onChange, value }: CustomSelectProps<E>) {

    const customStyles: StylesConfig<E, false> = {
        option: (provided, state) => ({
            ...provided,
            color: 'var(--bright-text)',
            background: state.isFocused ? 'var(--accent-second)' : 'var(--content-bg-light)',
        }),
        control: (provided) => ({
            ...provided,
            minWidth: '100px',
            background: 'var(--content-bg-light)',
            color: 'var(--main-text)',
            border: '2px solid var(--accent-second)',
            transition: 'border 300ms',
            ":focus": {
                border: '2px solid var(--accent-second-contrast)'
            },
            ":hover": {
                border: '2px solid var(--accent-second-contrast)'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--dark-text)',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--bright-text)'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--dark-text)',
            ":hover": {
                color: 'var(--bright-text)'
            }
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            background: 'var(--dark-text)'
        }),
        menuList: (provided) => ({
            ...provided,
            background: 'var(--content-bg-light)',
        }),
        container: (provided) => ({
            ...provided,
            width: 'fit-content',
        })
    }

    return (
        <div>
            <span className={styles.title}
            >{title}</span>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                isSearchable={false}
                styles={customStyles}
            />
        </div>
    )
}
