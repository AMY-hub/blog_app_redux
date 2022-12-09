import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../../app/store';
import { Theme, ThemeState } from './theme.types';

const initialState = {
    theme: Theme.Dark
} as ThemeState;

const persistThemeConfig = {
    key: 'blog-app/theme',
    storage,
    version: 1,
    whitelist: ['theme']
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        }
    }
});

export const selectTheme = (state: RootState) => state.theme;

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const persistedThemeReducer = persistReducer(persistThemeConfig, themeReducer);