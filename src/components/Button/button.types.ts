import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

export type ButtonCustomProps = {
    children?: ReactNode,
    styleType?: 'primary' | 'light' | 'plain' | 'ghost',
    size?: 'xl' | 'l' | 'm' | 's'
};

export type AsButton = ButtonCustomProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonCustomProps> & {
    as?: 'button',
    withLoading?: boolean,
    loading?: boolean
};

export type AsLink = ButtonCustomProps & Omit<LinkProps, keyof ButtonCustomProps> & {
    as: 'Link'
};

export type AsAnchor = ButtonCustomProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonCustomProps> & {
    as: 'a'
};

export type ButtonProps = AsButton | AsAnchor | AsLink;




