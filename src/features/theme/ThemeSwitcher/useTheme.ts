import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTheme, toggleTheme } from '../theme.slice';
import { Theme } from '../theme.types';

type UseThemeHook = () => [Theme, (theme: Theme) => void];

export const useTheme: UseThemeHook = () => {

    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(selectTheme);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme, dispatch]);

    const setTheme = (theme: Theme) => {
        dispatch(toggleTheme(theme));
    };

    return [theme, setTheme];
};