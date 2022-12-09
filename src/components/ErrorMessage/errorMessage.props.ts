import { DetailedHTMLProps, HTMLProps } from 'react';

export interface ErrorMessageProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    text: string;
}