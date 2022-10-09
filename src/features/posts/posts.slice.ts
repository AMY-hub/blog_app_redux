import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { isFulfilled, isLoading, isPublicationFulfilled, isPublicationPending, isPublicationRejected, isRejected } from './matchers';
import { deletePost } from './posts.actions';
import { PostsState } from './posts.types';

const initialState = {
    posts: [],
    totalCount: 0,
    currentPage: 1,
    loadingPostsStatus: 'idle',
    error: null,
    publicationStatus: 'idle',
    deletionStatus: 'idle'
} as PostsState;

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePost.pending, (state) => {
                state.deletionStatus = 'pending';
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.deletionStatus = 'succeeded';
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.deletionStatus = 'failed';
                state.error = action.payload || 'Something went wrong...';
            })
            .addMatcher(isLoading, (state) => {
                state.error = null;
                state.loadingPostsStatus = 'pending';
            })
            .addMatcher(isFulfilled, (state, action) => {
                state.error = null;
                state.loadingPostsStatus = 'succeeded';
                state.posts = action.payload.posts;
                state.totalCount = action.payload.totalCount;
                state.currentPage = action.payload.currentPage;
            })
            .addMatcher(isRejected, (state, action) => {
                state.error = action.error.message || 'Something went wrong...';
                state.loadingPostsStatus = 'failed';
            })
            .addMatcher(isPublicationPending, (state) => {
                state.publicationStatus = 'pending';
                state.error = null;
            })
            .addMatcher(isPublicationRejected, (state, action) => {
                state.publicationStatus = 'failed';
                state.error = action.payload || 'Something went wrong...';
            })
            .addMatcher(isPublicationFulfilled, (state) => {
                state.publicationStatus = 'succeeded';
                state.error = null;
            })
    }
});

export const selectPostsList = (state: RootState) => state.posts.posts;
export const selectPostsCount = (state: RootState) => state.posts.totalCount;
export const selectCurrentPage = (state: RootState) => state.posts.currentPage;
export const selectError = (state: RootState) => state.posts.error;
export const selectLoadingStatus = (state: RootState) => state.posts.loadingPostsStatus;
export const selectPublicationStatus = (state: RootState) => state.posts.publicationStatus;
export const selectDeletionStatus = (state: RootState) => state.posts.deletionStatus;

export const postsReducer = postsSlice.reducer;