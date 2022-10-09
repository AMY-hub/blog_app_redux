import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from './apiConfig';
import { postsReducer } from '../features/posts/posts.slice';
import { filterReducer } from '../features/filter/filter.slice';
import { detailsReducer } from '../features/details/details.slice';
import { persistedThemeReducer } from '../features/theme/theme.slice';
import { persistedUserReducer } from '../features/user/user.slice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['theme']
}

const rootReducer = combineReducers({
  user: persistedUserReducer,
  theme: persistedThemeReducer,
  filter: filterReducer,
  posts: postsReducer,
  details: detailsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: { api, client: axios }
    },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

