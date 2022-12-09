import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrder, toggleOrder } from '../filter.slice';
import { Order } from '../filter.types';

type UseOrderToggle = () => [Order, (ord: Order) => void];

export const useOrderToggle: UseOrderToggle = () => {

    const dispatch = useAppDispatch();
    const order = useAppSelector(selectOrder);

    const handleToggle = (ord: Order) => {
        dispatch(toggleOrder(ord));
    };

    return [order, handleToggle];
};