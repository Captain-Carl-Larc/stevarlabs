"use client";

// File: RichTextEditor.tsx
// Folder: src/modules/editor/components

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import imageCompression from "browser-image-compression";
import { getPresignedUrlAction } from "@/modules/upload/presigned-url.action";

// --- EXPANDED TOOLBAR ---
const EditorToolbar = ({ editor, onImageUpload }: { editor: any, onImageUpload: () => void }) => {
  if (!editor) return null;
  return (
    <div className="top-0 z-10 sticky flex flex-wrap items-center gap-1 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-sm p-2 border-slate-200 dark:border-slate-800 border-b rounded-t-xl">
      <div className="flex items-center gap-1 pr-2 border-slate-200 dark:border-slate-700 border-r">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1.5 text-sm font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("bold") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1.5 text-sm italic rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("italic") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1.5 text-sm underline rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("underline") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>U</button>
      </div>
      <div className="flex items-center gap-1 px-2 border-slate-200 dark:border-slate-700 border-r">
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1.5 text-sm font-semibold rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("heading", { level: 2 }) ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1.5 text-sm font-semibold rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("heading", { level: 3 }) ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>H3</button>
      </div>
      <div className="flex items-center gap-1 px-2 border-slate-200 dark:border-slate-700 border-r">
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1.5 text-sm rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("bulletList") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1.5 text-sm rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("orderedList") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1.5 text-sm rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive("codeBlock") ? "text-blue-600 bg-slate-200 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"}`}>Code</button>
      </div>
      <div className="flex items-center gap-1 pl-2">
        <button type="button" onClick={onImageUpload} className="hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1.5 rounded text-slate-700 dark:text-slate-300 text-sm">Image</button>
      </div>
    </div>
  );
};

// --- EDITOR CORE ---
interface RichTextEditorProps {
  initialContent?: any;
  onChange: (json: any) => void;
}

export function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto shadow-sm my-4" } }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent || { type: "doc", content: [] },
    editorProps: { attributes: { class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6" } },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    
    try {
      // 1. COMPRESS THE IMAGE IN THE BROWSER (Max 1MB, Max width 1920px)
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      // 2. GET THE DIRECT R2 TICKET FROM SERVER
      const { signedUrl, publicUrl, error } = await getPresignedUrlAction(compressedFile.name, compressedFile.type);
      
      if (error || !signedUrl || !publicUrl) {
        alert(error || "Failed to get upload ticket");
        return;
      }

      // 3. UPLOAD DIRECTLY FROM BROWSER TO CLOUDFLARE R2
      await fetch(signedUrl, {
        method: "PUT",
        body: compressedFile,
        headers: { "Content-Type": compressedFile.type },
      });

      // 4. INSERT INTO TIPTAP
      editor.chain().focus().setImage({ src: publicUrl }).run();

    } catch (err) {
      console.error("Upload process failed:", err);
      alert("Failed to compress and upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl w-full">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      <EditorToolbar editor={editor} onImageUpload={() => fileInputRef.current?.click()} />
      {isUploading && (
        <div className="z-20 absolute inset-0 flex justify-center items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl">
          <div className="bg-slate-900 shadow-lg px-4 py-2 rounded-lg font-semibold text-white text-sm">Compressing & Uploading...</div>
        </div>
      )}
      <div className="bg-white dark:bg-slate-950 rounded-b-xl max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}