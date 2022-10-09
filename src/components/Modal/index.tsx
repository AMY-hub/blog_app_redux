import { Button } from '../Button';
import { ModalProps } from './modal.props';

import './style.scss';

export const Modal: React.FC<ModalProps> = ({ onClose, message, callback }) => {
    return (
        <div className='modal'>
            <div className='modal__content'>
                <div className='modal__body' role='alert'>
                    <p>{message}</p>
                </div>
                <div className='modal__footer'>
                    <Button
                        as='button'
                        className='modal__yes'
                        onClick={() => callback(onClose)}
                        aria-label='confirm action'
                    >Yes</Button>
                    <Button
                        as='button'
                        styleType='light'
                        className='modal__no'
                        onClick={onClose}
                        aria-label='cancel action'
                    >No</Button>
                </div>
            </div>
        </div>

    )
}

