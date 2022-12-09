import { Order } from '../features/filter/filter.types';
import { Filter } from '../types';

export const basePath = 'https://petite-traveling-celestite.glitch.me';
export const register = basePath + '/register';
export const login = basePath + '/signin';
export const posts = basePath + '/posts';

export const itemsPerPage = 4;

export const options: Array<Filter> = [
    'all',
    'css',
    'javascript',
    'html'
];

export const getSelectedPosts = (order: Order, page?: number, filter?: string, authorId?: number, search?: string) => {
    let selected = basePath + `/posts?_sort=createdAt&_order=${order}`;

    if (search) {
        selected += `&q=${search}`;
    }
    if (page) {
        selected += `&_page=${page}&_limit=${itemsPerPage}`;
    }
    if (filter && filter !== 'all') {
        selected += `&topic=${filter}`;
    }
    if (authorId) {
        selected += `&authorId=${authorId}`;
    }
    return selected;
};

export const getSearched = (search: string) => {
    return posts + `?q=${search}&_page=1&_limit=${itemsPerPage}`;
};

export const getPostDetails = (id: string) => {
    return basePath + '/posts/' + id;
};