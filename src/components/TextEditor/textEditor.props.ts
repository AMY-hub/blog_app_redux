import { DetailedHTMLProps, HTMLProps } from 'react'
import { Editor } from '../../../node_modules/@tiptap/react/src/Editor'

export interface EditorProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    HTML: string,
    setHTML: React.Dispatch<React.SetStateAction<string>>,
    limit?: number,
    type?: 'preview' | 'full'
}

export interface MenuProps {
    editor: Editor | null,
    type?: 'preview' | 'full'
}
