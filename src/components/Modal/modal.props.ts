import { ReactNode } from 'react';

export interface ModalProps {
    children: ReactNode,
    onClose: () => void,
    callback: (onClose: () => void) => void,
    confitmBtnText?: string,
    cancelBtnText?: string,
}