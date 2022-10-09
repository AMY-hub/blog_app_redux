import cn from 'classnames';
import { Order } from '../filter.types';
import { useOrderToggle } from './useOrderToggle';
import { ReactComponent as Icon } from './icon.svg';

import styles from './style.module.scss';

export const OrderToggle = () => {

    const [order, handleToggle] = useOrderToggle();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, ord: Order) => {
        if (e.key === 'Enter') {
            handleToggle(ord);
        }
    }

    return (
        <div className={styles.order}>
            <label
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'desc')}
                className={
                    cn(styles.order_label, {
                        [styles.label_active]: order === 'desc'
                    })
                }>
                <Icon className={styles.desc_icon} />
                Newest first
                <input
                    tabIndex={-1}
                    type='radio'
                    value='desc'
                    name='order'
                    className='hidden'
                    onChange={() => handleToggle('desc')}
                />
            </label>
            <label
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'asc')}
                className={
                    cn(styles.order_label, {
                        [styles.label_active]: order === 'asc'
                    })
                }>
                <Icon className={styles.asc_icon} />
                Oldest first
                <input
                    tabIndex={-1}
                    type='radio'
                    value='asc'
                    name='order'
                    className='hidden'
                    onChange={() => handleToggle('asc')}
                />
            </label>
        </div>
    )
}
