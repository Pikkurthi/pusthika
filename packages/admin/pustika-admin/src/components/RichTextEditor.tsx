import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

type Props = {
  content: string;
  onChange: (html: string) => void;
};

const RichTextEditor: React.FC<Props> = ({ content, onChange }) => {

  
  const editor = useEditor({
    extensions: [StarterKit, Underline, Bold, Italic],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] p-4 border border-base-300 rounded-md bg-base-100 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);


  if (!editor) return null;



  const buttonStyle =
    'btn btn-sm btn-ghost px-3 rounded-md hover:bg-base-200';

  return (
    <div className="mb-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-2 bg-base-100 border border-base-300 p-2 rounded-md">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonStyle} ${editor.isActive('bold') ? 'btn-active' : ''}`}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonStyle} ${editor.isActive('italic') ? 'btn-active' : ''}`}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonStyle} ${editor.isActive('underline') ? 'btn-active' : ''}`}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonStyle} ${editor.isActive('bulletList') ? 'btn-active' : ''}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonStyle} ${editor.isActive('heading', { level: 1 }) ? 'btn-active' : ''}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonStyle} ${editor.isActive('heading', { level: 2 }) ? 'btn-active' : ''}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={buttonStyle}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={buttonStyle}
        >
          Redo
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
