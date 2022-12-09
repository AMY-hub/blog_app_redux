import axios from 'axios';
import { Order } from '../features/filter/filter.types';
import { RootState } from './store';

export type ClientType = typeof axios;

export interface ApiType {
    getSelectedPosts: (order: Order, page?: number, filter?: string, authorId?: number, search?: string) => string,
    getPostDetails: (id: string) => string,
    login: string,
    register: string,
    posts: string,
    getSearched: (search: string) => string
}

export interface AddConfig {
    client: ClientType,
    api: ApiType
}

export interface ThunkApiTypes {
    extra: AddConfig,
    state: RootState,
    rejectValue: string
}