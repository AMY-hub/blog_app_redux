import { PayloadAction } from '@reduxjs/toolkit';

export const isRejected = (action: PayloadAction) => {
    return action.type === 'loadPaginatedPosts/rejected' || action.type === 'searchPosts/rejected';
}

export const isLoading = (action: PayloadAction) => {
    return action.type === 'loadPaginatedPosts/pending' || action.type === 'searchPosts/pending';
}

export const isFulfilled = (action: PayloadAction) => {
    return action.type === 'loadPaginatedPosts/fulfilled' || action.type === 'searchPosts/fulfilled';
}

export const isPublicationRejected = (action: PayloadAction) => {
    return action.type === 'createPost/rejected' || action.type === 'updatePost/rejected';
}

export const isPublicationPending = (action: PayloadAction) => {
    return action.type === 'createPost/pending' || action.type === 'updatePost/pending';
}

export const isPublicationFulfilled = (action: PayloadAction) => {
    return action.type === 'createPost/fulfilled' || action.type === 'updatePost/fulfilled';
}