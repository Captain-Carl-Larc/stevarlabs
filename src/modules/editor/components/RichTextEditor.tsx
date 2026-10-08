"use client";

// File: RichTextEditor.tsx
// Folder: src/modules/editor/components
// Description: Core Tiptap editor component emitting structured JSON for the CMS.

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import  {EditorToolbar}  from "@/modules/editor/components/EditorToolbar";

interface RichTextEditorProps {
  initialContent?: any; // Expects Tiptap JSON
  onChange: (json: any) => void;
}

export function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }, // H1 is reserved for the post title
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto shadow-sm",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent || { type: "doc", content: [] }, // Default empty JSON
    editorProps: {
      attributes: {
        // Tailwind Typography (prose) is used here so the editor looks exactly like the frontend blog
        class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },
    onUpdate: ({ editor }) => {
      // Emit the raw JSON struct back to our Next.js form state
      onChange(editor.getJSON());
    },
  });

  const handleImageUpload = async () => {
    // Phase 1 Placeholder: Prompts for an image URL manually.
    // In the next step, we will replace this with an R2 file picker & uploader!
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl w-full">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      
      {/* 
        This wrapper allows the user to scroll through long content 
        while the toolbar stays pinned to the top.
      */}
      <div className="bg-white dark:bg-slate-950 rounded-b-xl max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}