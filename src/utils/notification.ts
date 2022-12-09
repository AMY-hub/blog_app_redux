import { Id, toast } from 'react-toastify';

export const successAlert = (message: string): Id => toast(message, {
    type: 'success',
    pauseOnHover: false,
    draggable: true,
});