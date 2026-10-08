"use client";

// File: EditorToolbar.tsx
// Folder: src/modules/editor/components
// Description: The sticky formatting toolbar for the rich text editor.

import { type Editor } from "@tiptap/react";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading2, Heading3, List, ListOrdered, Code, Quote, 
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link2
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: () => void;
}

export function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const ToolbarBtn = ({ onClick, isActive, children, title }: { onClick: () => void, isActive: boolean, children: React.ReactNode, title: string }) => (
    <button
      type="button" onClick={onClick} title={title}
      className={`p-2 rounded-md transition-colors ${isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="top-0 z-10 sticky flex flex-wrap items-center gap-2 bg-white dark:bg-slate-950 p-2 border-slate-200 dark:border-slate-800 border-b rounded-t-xl">
      
      {/* Formatting Group */}
      <div className="flex items-center gap-0.5 pr-2 border-slate-200 dark:border-slate-700 border-r">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Bold"><Bold className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Italic"><Italic className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Underline"><UnderlineIcon className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} title="Strikethrough"><Strikethrough className="w-4 h-4" /></ToolbarBtn>
      </div>

      {/* Headings Group */}
      <div className="flex items-center gap-0.5 px-2 border-slate-200 dark:border-slate-700 border-r">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 className="w-4 h-4" /></ToolbarBtn>
      </div>

      {/* Alignment Group */}
      <div className="flex items-center gap-0.5 px-2 border-slate-200 dark:border-slate-700 border-r">
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify"><AlignJustify className="w-4 h-4" /></ToolbarBtn>
      </div>

      {/* Lists & Blocks Group */}
      <div className="flex items-center gap-0.5 px-2 border-slate-200 dark:border-slate-700 border-r">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Bullet List"><List className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Numbered List"><ListOrdered className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Quote"><Quote className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Code Block"><Code className="w-4 h-4" /></ToolbarBtn>
      </div>

      {/* Media Group */}
      <div className="flex items-center gap-0.5 pl-2">
        <ToolbarBtn onClick={toggleLink} isActive={editor.isActive("link")} title="Insert Link"><Link2 className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={onImageUpload} isActive={false} title="Insert Image"><ImageIcon className="w-4 h-4" /></ToolbarBtn>
      </div>
    </div>
  );
}