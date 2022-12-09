import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../../app/store';
import { isFulfilled, isPending, isRehydrate, isRejected } from './matchers';
import { UserState } from './user.types';

const initialState = {
    userData: null,
    loading: false,
    error: null,
    accessToken: null,
    authAt: null
} as UserState;

const persistConfig = {
    key: 'blog-app/user',
    storage,
    version: 1,
    whitelist: ['userData', 'accessToken', 'authAt']
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isRehydrate, (_, action: PayloadAction<Omit<UserState, 'loading' | 'error'>>) => {
                if (action.payload?.authAt) {
                    const now = Date.now();
                    const isExpired = (now - action.payload.authAt) / 1000 > 3600;
                    if (isExpired) {
                        action.payload = initialState;
                    }
                }
            })
            .addMatcher(isFulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.authAt = Date.now();
            })
            .addMatcher(isPending, (state) => {
                state.loading = true;
                state.error = null;
                state.accessToken = null;
                state.userData = null;
                state.authAt = null;
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.authAt = null;
                state.error = action.payload || action.error.message || 'Something went wrong...';
            });
    }
});

export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectUserState = (state: RootState) => state.user;
export const selectUserData = (state: RootState) => state.user.userData;
export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const persistedUserReducer = persistReducer(persistConfig, userReducer);
