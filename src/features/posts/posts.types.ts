import { PostData, PostFormData, Topics } from '../../types';
import { Order } from '../filter/filter.types';

export interface PostsState {
    posts: PostData[],
    totalCount: number,
    currentPage: number,
    loadingPostsStatus: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null,
    publicationStatus: 'idle' | 'pending' | 'succeeded' | 'failed',
    deletionStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export type OptionType = {
    value: Topics,
    label: string
}

export type OptionsMap = {
    [Property in Topics]: OptionType
}

export interface PostsWithCount {
    posts: PostData[],
    totalCount: number,
    currentPage: number,
}

export interface LoadedPostsParams {
    order: Order,
    page: number,
    filter: string,
    authotId?: number,
    search?: string
}

export interface Publication {
    data: PostFormData,
    token: string
}

export interface ChangingPostData extends Publication {
    id: number
}

export interface DeleteData {
    id: number,
    token: string
}