export interface ModalProps {
    message: string,
    onClose: () => void;
    callback: (onClose: () => void) => void;
}