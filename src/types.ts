export interface PostFormData {
    title: string,
    preview: string,
    body: string,
    author: string,
    topic: Topics,
    authorId: number
}

export interface PostData {
    title: string,
    preview: string,
    body: string,
    author: string,
    topic: Topics,
    authorId: number
    createdAt: number,
    id: number,
}

export type Topics = | 'css' | 'html' | 'javascript'

export type Filter = 'all' | 'css' | 'javascript' | 'html';

export interface UserInfo {
    email: string,
    name: string,
    id: number
}