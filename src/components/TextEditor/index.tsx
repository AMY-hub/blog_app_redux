import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from '@tiptap/extension-character-count';
import cn from 'classnames';
import { TextEditorMenu } from "./TextEditorMenu";
import { EditorProps } from './textEditor.props';

import styles from './style.module.scss';

export const TextEditor: React.FC<EditorProps> = ({ HTML, setHTML, className, limit, type, ...props }) => {

    const editor = useEditor({
        content: HTML,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your text here...'
            }),
            CharacterCount.configure({
                limit: limit || null
            })
        ],
        onUpdate: ({ editor }) => setHTML(editor.getHTML()),
    });

    const charsCount = editor?.storage.characterCount.characters();

    return (
        <div className={cn(styles.texteditor, className)} {...props}>
            <TextEditorMenu editor={editor} type={type} />
            <EditorContent editor={editor}
                className={styles.texteditor__textfield} />
            {
                limit &&
                <p className={cn(styles.texteditor__info, {
                    [styles.danger]: limit - charsCount === 0
                })}
                >{`Maximum ${limit} characters: ${limit - charsCount} left`}
                </p>
            }
        </div>
    )
}
