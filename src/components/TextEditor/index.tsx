import { useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from '@tiptap/extension-character-count';
import cn from 'classnames';
import { Modal, Button } from '..';
import { TextEditorMenu } from "./TextEditorMenu";
import { EditorProps } from './textEditor.props';

import styles from './style.module.scss';

export const TextEditor: React.FC<EditorProps> = ({ HTML, setHTML, className, limit, type, ...props }) => {

    const imageRef = useRef<HTMLInputElement>(null);
    const editor = useEditor({
        content: HTML,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your text here...'
            }),
            CharacterCount.configure({
                limit: limit || null
            }),
            Image.configure({
                HTMLAttributes: {
                    class: styles.post__image,
                }
            })
        ],
        onUpdate: ({ editor }) => setHTML(editor.getHTML()),
    });

    const charsCount = editor?.storage.characterCount.characters();

    const addImage = (onClose: () => void): void => {
        const url = imageRef.current?.value.trim();
        if (url) {
            editor?.chain()
                .setImage({ src: url, alt: 'post__image' })
                .createParagraphNear()
                .focus()
                .run();
        }
        onClose();
    }

    const handleAddImage = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Modal
                        onClose={onClose}
                        callback={addImage}
                        confitmBtnText='Add image'
                        cancelBtnText='Cancel'
                    >
                        <label className={styles.texteditor__img_url}>
                            'Enter an URL of your image:'
                            <input type='text' required ref={imageRef} />
                        </label>
                    </Modal>
                );
            }
        });
    }

    return (
        <div className={cn(styles.texteditor, className)} {...props}>
            <div>
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
            {type === 'full' &&
                <div className={styles.texteditor__add_img}>
                    <Button
                        as='button'
                        styleType='ghost'
                        size='s'
                        type='button'
                        onClick={handleAddImage}
                    >Add image*</Button>
                    <span className={styles.texteditor__info}
                    >*url only</span>
                </div>
            }
        </div>
    )
}
