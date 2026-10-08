"use client";

// File: RichTextEditor.tsx
// Folder: src/modules/editor/components
// Description: Core Tiptap editor orchestrating state and image uploads.

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import imageCompression from "browser-image-compression";
import { getPresignedUrlAction } from "@/modules/upload/presigned-url.action";
import { EditorToolbar } from "./EditorToolbar";

interface RichTextEditorProps {
  initialContent?: any;
  onChange: (json: any) => void;
}

export function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
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
    editorProps: { 
      attributes: { 
        class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6" 
      } 
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    setUploadError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
      const { signedUrl, publicUrl, error: presignError } = await getPresignedUrlAction(compressedFile.name, compressedFile.type);
      
      if (presignError || !signedUrl || !publicUrl) throw new Error(presignError || "Failed to get upload ticket");

      const uploadRes = await fetch(signedUrl, { 
        method: "PUT", 
        body: compressedFile, 
        headers: { "Content-Type": compressedFile.type },
        signal: controller.signal
      });

      if (!uploadRes.ok) throw new Error(`Upload rejected with status ${uploadRes.status}`);

      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (err: any) {
      console.error("Editor Image Upload Error:", err);
      if (err.name === 'AbortError') {
        setUploadError("Upload timed out after 15 seconds.");
      } else {
        setUploadError(err.message || "Failed to upload image.");
      }
      setTimeout(() => setUploadError(null), 5000);
    } finally {
      clearTimeout(timeoutId);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!editor) return null;

  return (
    <div className="relative bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl w-full">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      
      <EditorToolbar editor={editor} onImageUpload={() => fileInputRef.current?.click()} />
      
      {/* Upload Progress & Errors overlay */}
      {(isUploading || uploadError) && (
        <div className="top-14 z-20 absolute inset-x-0 flex justify-center p-2">
          <div className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur ${uploadError ? "bg-red-600/90 text-white" : "bg-slate-900/90 text-white animate-pulse"}`}>
            {uploadError || "Compressing & Uploading..."}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-950 rounded-b-xl max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}