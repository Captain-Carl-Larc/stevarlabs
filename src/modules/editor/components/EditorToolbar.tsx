"use client";

// File: EditorToolbar.tsx
// Folder: src/modules/editor/components
// Description: The sticky formatting toolbar for the rich text editor.

import { Editor } from "@tiptap/react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload?: () => void; // We will wire this to R2 next
}

export function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  if (!editor) return null;

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

  return (
    <div className="top-0 z-10 sticky flex flex-wrap items-center gap-1 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-sm p-2 border-slate-200 dark:border-slate-800 border-b rounded-t-xl">
      
      {/* Typography */}
      <div className="flex items-center gap-1 pr-2 border-slate-200 dark:border-slate-700 border-r">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1.5 text-sm font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1.5 text-sm italic rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1.5 text-sm line-through rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("strike") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          S
        </button>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 px-2 border-slate-200 dark:border-slate-700 border-r">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1.5 text-sm font-semibold rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1.5 text-sm font-semibold rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("heading", { level: 3 }) ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          H3
        </button>
      </div>

      {/* Lists & Blocks */}
      <div className="flex items-center gap-1 px-2 border-slate-200 dark:border-slate-700 border-r">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1.5 text-sm rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("bulletList") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1.5 text-sm rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("blockquote") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          " Quote
        </button>
      </div>

      {/* Links & Media */}
      <div className="flex items-center gap-1 pl-2">
        <button
          type="button"
          onClick={toggleLink}
          className={`px-2 py-1.5 text-sm rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("link") ? "bg-slate-200 dark:bg-slate-800 text-blue-600" : "text-slate-700 dark:text-slate-300"}`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={onImageUpload}
          className="hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1.5 rounded-md text-slate-700 dark:text-slate-300 text-sm"
        >
          Image
        </button>
      </div>
    </div>
  );
}