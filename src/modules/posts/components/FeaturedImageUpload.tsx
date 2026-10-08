"use client";

// File: FeaturedImageUpload.tsx
// Folder: src/app/admin/posts/components

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { getPresignedUrlAction } from "@/modules/upload/presigned-url.action";

interface Props {
  imageUrl: string;
  onImageChange: (url: string) => void;
  altText: string;
  onAltTextChange: (text: string) => void;
}

export function FeaturedImageUpload({ imageUrl, onImageChange, altText, onAltTextChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Compress
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
      // 2. Get Ticket
      const { signedUrl, publicUrl, error } = await getPresignedUrlAction(compressedFile.name, compressedFile.type);
      
      if (error || !signedUrl || !publicUrl) throw new Error(error || "Failed to get upload ticket");

      // 3. Upload to R2
      await fetch(signedUrl, { method: "PUT", body: compressedFile, headers: { "Content-Type": compressedFile.type } });

      // 4. Update State
      onImageChange(publicUrl);
    } catch (err) {
      alert("Failed to upload featured image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
      <h3 className="font-semibold text-slate-900 dark:text-white">Featured Image</h3>
      
      {imageUrl ? (
        <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-full aspect-video overflow-hidden">
          <img src={imageUrl} alt="Featured preview" className="w-full h-full object-cover" />
          <button 
            type="button" 
            onClick={() => onImageChange("")}
            className="top-2 right-2 absolute bg-red-600/90 hover:bg-red-600 shadow backdrop-blur px-2 py-1 rounded-md font-bold text-white text-xs"
          >
            Remove
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col justify-center items-center bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg w-full aspect-video cursor-pointer"
        >
          <span className="font-medium text-slate-500 dark:text-slate-400 text-sm">
            {isUploading ? "Uploading..." : "Click to upload featured image"}
          </span>
        </div>
      )}
      
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Image Alt Text</label>
        <input 
          type="text" value={altText} onChange={(e) => onAltTextChange(e.target.value)}
          placeholder="Describe the image for SEO & accessibility"
          className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
        />
      </div>
    </div>
  );
}