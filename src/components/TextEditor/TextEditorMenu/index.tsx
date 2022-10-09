import cn from 'classnames';
import { MenuProps } from '../textEditor.props';

import styles from './style.module.scss';

export const TextEditorMenu: React.FC<MenuProps> = ({ editor, type }) => {
    if (!editor) return null;

    return (
        <div className={styles.menubar}>
            <button
                type='button'
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >hard break
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn({ [styles.active]: editor.isActive('bold') })}
            >bold
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn({ [styles.active]: editor.isActive('italic') })}
            >italic
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn({ [styles.active]: editor.isActive('strike') })}
            >strike
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn({ [styles.active]: editor.isActive('heading', { level: 1 }) })}
            >h1
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn({ [styles.active]: editor.isActive('heading', { level: 2 }) })}
            >h2
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn({ [styles.active]: editor.isActive('heading', { level: 3 }) })}
            >h3
            </button>
            {
                type === 'full' &&
                <>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={cn({ [styles.active]: editor.isActive('heading', { level: 4 }) })}
                    >h4
                    </button>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={cn({ [styles.active]: editor.isActive('heading', { level: 5 }) })}
                    >h5
                    </button>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={cn({ [styles.active]: editor.isActive('heading', { level: 6 }) })}
                    >h6
                    </button>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn({ [styles.active]: editor.isActive('orderedLlist') })}
                    >ordered list
                    </button>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn({ [styles.active]: editor.isActive('bulletList') })}
                    >bullet list
                    </button>
                    <button
                        type='button'
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={cn({ [styles.active]: editor.isActive('code') })}
                    >code
                    </button>
                </>
            }
        </div>
    )
}