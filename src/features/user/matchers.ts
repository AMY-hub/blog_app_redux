import { PayloadAction } from '@reduxjs/toolkit';

export const isRehydrate = (action: PayloadAction) => action.type === 'persist/REHYDRATE';

export const isPending = (action: PayloadAction) => {
    return action.type === 'user/login/pending' || action.type === 'user/register/pending';
}

export const isFulfilled = (action: PayloadAction) => {
    return action.type === 'user/login/fulfilled' || action.type === 'user/register/fulfilled';
}

export const isRejected = (action: PayloadAction) => {
    return action.type === 'user/login/rejected' || action.type === 'user/register/rejected';
}