import { nanoid } from '@reduxjs/toolkit';
import cn from 'classnames';
import { Button } from '../../../components';
import { PaginationProps } from './pagination.types';

import styles from './style.module.scss';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, pagesTotalCount, setPage, getNextPage, getPrevPage, paginationRange }) => {

    const pagesBtns = paginationRange.map(el => {
        if (typeof el === 'number') {
            return (
                <Button
                    className={cn(styles.pagination__page, {
                        [styles.active]: currentPage === el
                    })}
                    onClick={() => setPage(el)}
                    key={el}
                    aria-label={`to page ${el}`}
                >
                    {el}
                </Button>
            );
        } else {
            return <span key={nanoid()} className={styles.dots}>{el}</span>;
        }

    });

    return (
        <div className={styles.pagination}>
            <Button
                styleType='light'
                className={cn(styles.pagination__prev, 'icon-arrow')}
                disabled={currentPage === 1}
                onClick={getPrevPage}
                aria-label='to the previous page'
            ></Button>
            {pagesBtns}
            <Button
                styleType='light'
                className={cn(styles.pagination__next, 'icon-arrow')}
                disabled={currentPage === pagesTotalCount}
                onClick={getNextPage}
                aria-label='to the next page'
            ></Button>
        </div>
    );
};
