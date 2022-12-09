import cn from 'classnames';
import { ErrorMessageProps } from './errorMessage.props';

import styles from './style.module.scss';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text, className, ...props }) => {
    return (
        <div
            role='alert'
            className={cn(styles.error, className)}
            {...props}
        >{`Error: ${text}`}</div>
    );
};
