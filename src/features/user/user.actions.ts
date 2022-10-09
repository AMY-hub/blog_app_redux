import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ThunkApiTypes } from '../../app/store.types';
import { UserLoginData, UserRegisterData, UserResponse } from './user.types';

export const registerUser = createAsyncThunk<UserResponse, UserRegisterData, ThunkApiTypes>(
    'user/register',
    async (formData, { extra: { api, client }, rejectWithValue }) => {
        try {
            const res = await client.post<UserResponse>(api.register, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return res.data;
        } catch (err) {
            let message = 'Registration failed';
            if (axios.isAxiosError(err) && err.response) {
                const response = err.response as AxiosResponse<string>;
                message = response.data;
            }
            return rejectWithValue(message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { user } = getState();
            if (user.loading) {
                return false;
            }
        }
    }
);

export const loginUser = createAsyncThunk<UserResponse, UserLoginData, ThunkApiTypes>(
    'user/login',
    async (formData, { extra: { api, client }, rejectWithValue }) => {
        try {
            const res = await client.post<UserResponse>(api.login, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return res.data;
        } catch (err) {
            let message = 'Login failed';
            if (axios.isAxiosError(err) && err.response) {
                const response = err.response as AxiosResponse<string>;
                message = response.data;
            }
            return rejectWithValue(message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { user } = getState();
            if (user.loading) {
                return false;
            }
        }
    }
);