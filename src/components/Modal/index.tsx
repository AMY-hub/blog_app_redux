import { Button } from '../Button';
import { ModalProps } from './modal.props';

import './style.scss';

export const Modal: React.FC<ModalProps> = ({ onClose, children, callback, confitmBtnText = 'Yes', cancelBtnText = 'No' }) => {
    return (
        <div className='modal'>
            <div className='modal__content'>
                <div className='modal__body' role='alert'>
                    {children}
                </div>
                <div className='modal__footer'>
                    <Button
                        as='button'
                        className='modal__yes'
                        onClick={() => callback(onClose)}
                        aria-label='confirm action'
                    >
                        {confitmBtnText}
                    </Button>
                    <Button
                        as='button'
                        styleType='light'
                        className='modal__no'
                        onClick={onClose}
                        aria-label='cancel action'
                    >
                        {cancelBtnText}
                    </Button>
                </div>
            </div>
        </div>

    )
}

