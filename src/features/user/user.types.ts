import { UserInfo } from '../../types';

export interface UserState {
    userData: UserInfo | null,
    loading: boolean,
    error: string | null,
    accessToken: string | null,
    authAt: number | null
}

export interface UserLoginData {
    email: string,
    password: string
}

export interface UserRegisterData extends UserLoginData {
    name: string
}

export interface UserResponse {
    user: UserInfo,
    accessToken: string
}

export interface LoginFormFields {
    email: HTMLInputElement,
    password: HTMLInputElement
}

export interface RegisterFormFields extends LoginFormFields {
    name: HTMLInputElement
}