import { PostData } from '../../types';

export interface DetailsState {
    post: PostData | null,
    loading: boolean,
    error: string | null
}