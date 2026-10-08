"use client";

// File: RichTextEditor.tsx
// Folder: src/modules/editor/components

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { EditorToolbar } from "./EditorToolbar";
import { uploadImageAction } from "@/modules/upload/upload.action";

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
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto shadow-sm my-4" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline hover:text-blue-800 dark:text-blue-400" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent || { type: "doc", content: [] },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Programmatically click the hidden file input
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle the actual file selection and upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadImageAction(formData);

    if (res.error) {
      alert(res.error);
    } else if (res.url) {
      // Insert the image at the current cursor position
      editor.chain().focus().setImage({ src: res.url }).run();
    }

    setIsUploading(false);
    // Reset the input so the same file can be uploaded again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl w-full">
      
      {/* Hidden File Input for Image Uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp, image/gif" 
        className="hidden" 
      />

      <EditorToolbar editor={editor} onImageUpload={handleImageUploadClick} />
      
      {/* Loading Overlay for Uploads */}
      {isUploading && (
        <div className="z-20 absolute inset-0 flex justify-center items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl">
          <div className="bg-slate-900 shadow-lg px-4 py-2 rounded-lg font-semibold text-white text-sm">
            Uploading image...
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-950 rounded-b-xl max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}