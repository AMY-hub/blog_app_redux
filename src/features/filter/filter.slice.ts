import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { options } from '../../app/apiConfig';
import { RootState } from '../../app/store';
import { Filter } from '../../types';
import { FilterState, Order } from './filter.types';

const getInitialState = (): FilterState => {
    const params = (new URL(document.location.href)).searchParams;
    const filter = params.get('filter') as Filter;
    return {
        topicFilter: options.includes(filter) ? filter : 'all',
        order: 'desc',
        selectByAuthor: false,
        search: ''
    };
};

const filterSlice = createSlice({
    name: 'filters',
    initialState: getInitialState(),
    reducers: {
        changeTopicFilter: (state, action: PayloadAction<Filter>) => {
            state.topicFilter = action.payload;
        },
        toggleOrder: (state, action: PayloadAction<Order>) => {
            state.order = action.payload;
        },
        toggleSelectByAuthor: (state) => {
            state.selectByAuthor = !state.selectByAuthor;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

export const selectTopicFilter = (state: RootState) => state.filter.topicFilter;
export const selectOrder = (state: RootState) => state.filter.order;
export const selectByAuthor = (state: RootState) => state.filter.selectByAuthor;
export const selectSearch = (state: RootState) => state.filter.search;
export const filterReducer = filterSlice.reducer;
export const { changeTopicFilter, toggleOrder, toggleSelectByAuthor, setSearch } = filterSlice.actions;