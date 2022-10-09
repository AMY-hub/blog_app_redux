import cn from 'classnames';
import { ButtonProps } from './button.types';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

export const Button: React.FC<ButtonProps> = (props): JSX.Element => {

    const { className, styleType = 'primary', size = 'm', as } = props;
    const classes = cn(styles.btn, styles[styleType], styles[size], className);

    if (as === 'Link') {
        const { className, styleType, size, as, to, children, ...rest } = props;
        return (
            <Link to={to} className={classes} {...rest}>
                {children}
            </Link>
        )
    } else if (as === 'a') {
        const { className, styleType, size, as, children, ...rest } = props;
        return (
            <a className={classes} target='_blank' {...rest}>
                {children}
            </a>
        )
    } else {
        const { className, styleType, size, as, children, withLoading, loading, ...rest } = props;

        return (
            <>
                {
                    withLoading ?
                        <button
                            type='submit'
                            disabled={loading}
                            className={classes}
                            {...rest}>
                            {
                                loading ?
                                    <>
                                        <div className={styles.loader}></div>
                                        <span className={styles.hidden}>{children}</span>
                                    </>
                                    :
                                    children
                            }
                        </button >
                        :
                        <button
                            className={classes}
                            {...rest}>
                            {children}
                        </button >
                }
            </>
        )
    }
}

