import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { ThunkApiTypes } from '../../app/store.types';
import { PostData } from '../../types';
import { DetailsState } from './details.types'

const initialState = {
    post: null,
    loading: false,
    error: null
} as DetailsState;

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.post = null;
            })
            .addCase(loadDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong...';
            })
            .addCase(loadDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.post = action.payload;
            })
    }
});

export const loadDetails = createAsyncThunk<PostData, string, ThunkApiTypes>(
    'loadPostDetails',
    async (id, { extra: { api, client } }) => {
        const { data } = await client.get<PostData>(api.getPostDetails(id));
        return data;
    },
    {
        condition: (_, { getState }) => {
            const { details } = getState();
            if (details.loading) {
                return false;
            }
        }
    }
);

export const selectDetails = (state: RootState) => state.details;
export const selectDetailedPost = (state: RootState) => state.details.post;
export const detailsReducer = detailsSlice.reducer;
