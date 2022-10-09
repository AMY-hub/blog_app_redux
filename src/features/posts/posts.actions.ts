import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiTypes } from '../../app/store.types';
import { PostData } from '../../types';
import { ChangingPostData, DeleteData, LoadedPostsParams, PostsWithCount, Publication } from './posts.types';

export const loadPosts = createAsyncThunk<PostsWithCount, LoadedPostsParams, ThunkApiTypes>(
    'loadPaginatedPosts',
    async ({ page, filter, authotId, search }, { extra: { api, client }, getState }) => {
        const { filter: { order } } = getState();
        const res = await client.get<PostData[]>(api.getSelectedPosts(order, page, filter, authotId, search));

        return {
            posts: res.data,
            totalCount: +res.headers['x-total-count'],
            currentPage: page
        };
    },
    {
        condition: (_, { getState }) => {
            const { posts } = getState();
            if (posts.loadingPostsStatus === 'pending') {
                return false;
            }
        }
    }
);

// export const searchPosts = createAsyncThunk<PostsWithCount, string, ThunkApiTypes>(
//     'searchPosts',
//     async (search, { extra: { api, client } }) => {
//         const res = await client.get<PostData[]>(api.getSearched(search));
//         return {
//             posts: res.data,
//             totalCount: +res.headers['x-total-count'],
//             currentPage: 1
//         }
//     },
//     {
//         condition: (_, { getState }) => {
//             const { posts } = getState();
//             if (posts.loadingPostsStatus === 'pending') {
//                 return false;
//             }
//         }
//     }
// )

export const createPost = createAsyncThunk<PostData, Publication, ThunkApiTypes>(
    'createPost',
    async ({ data, token }, { extra: { api, client }, rejectWithValue }) => {
        const res = await client.post<PostData>(api.posts, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status !== 201) {
            return rejectWithValue('Couldn\'t create the post.');
        } else {
            return res.data;
        }
    }
);

export const updatePost = createAsyncThunk<PostData, ChangingPostData, ThunkApiTypes>(
    'updatePost',
    async ({ data, token, id }, { extra: { api, client }, rejectWithValue }) => {
        const res = await client.put<PostData>(api.posts + `/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status !== 200) {
            return rejectWithValue('Couldn\'t create the post.');
        } else {
            return res.data;
        }
    }
);

export const deletePost = createAsyncThunk<void, DeleteData, ThunkApiTypes>(
    'deletePost',
    async ({ token, id }, { extra: { api, client }, rejectWithValue }) => {
        const { status } = await client.delete(api.posts + `/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (status !== 200) {
            return rejectWithValue('Couldn\'t delete the post.')
        }
    }
);