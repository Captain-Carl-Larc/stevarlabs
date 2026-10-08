"use client";

// File: FeaturedImageUpload.tsx
// Folder: src/app/admin/posts/components

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { getPresignedUrlAction } from "@/modules/upload/presigned-url.action";
import { ImagePlus, X, AlertCircle } from "lucide-react";

interface Props {
  imageUrl: string;
  onImageChange: (url: string) => void;
  altText: string;
  onAltTextChange: (text: string) => void;
}

export function FeaturedImageUpload({ imageUrl, onImageChange, altText, onAltTextChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    
    // 15-second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
      const { signedUrl, publicUrl, error: presignError } = await getPresignedUrlAction(compressedFile.name, compressedFile.type);
      
      if (presignError || !signedUrl || !publicUrl) {
        throw new Error(presignError || "Failed to generate upload ticket.");
      }

      const uploadRes = await fetch(signedUrl, { 
        method: "PUT", 
        body: compressedFile, 
        headers: { "Content-Type": compressedFile.type },
        signal: controller.signal 
      });

      if (!uploadRes.ok) throw new Error(`Upload rejected with status ${uploadRes.status}`);

      onImageChange(publicUrl);
    } catch (err: any) {
      console.error("Upload Error Details:", err);
      if (err.name === 'AbortError') {
        setError("Upload timed out after 15 seconds. Please check your connection.");
      } else {
        setError(err.message || "Failed to upload image. Check console for details.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
      <h3 className="font-semibold text-slate-900 dark:text-white">Featured Image</h3>
      
      {error && (
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="flex-shrink-0 w-4 h-4" />
          <p>{error}</p>
        </div>
      )}

      {imageUrl ? (
        <div className="group relative border border-slate-200 dark:border-slate-700 rounded-lg w-full aspect-video overflow-hidden">
          <img src={imageUrl} alt="Featured preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <button 
            type="button" 
            onClick={() => onImageChange("")}
            className="top-2 right-2 absolute bg-slate-900/70 hover:bg-red-600 backdrop-blur p-1.5 rounded-md text-white transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col justify-center items-center gap-3 bg-slate-50 hover:bg-blue-50 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 border-2 border-slate-300 hover:border-blue-500 dark:border-slate-700 dark:hover:border-blue-500/50 border-dashed rounded-lg w-full aspect-video transition-colors cursor-pointer"
        >
          <ImagePlus className={`h-8 w-8 ${isUploading ? "text-blue-500 animate-pulse" : "text-slate-400"}`} />
          <span className="font-medium text-slate-500 dark:text-slate-400 text-sm">
            {isUploading ? "Uploading & Optimizing..." : "Click to upload featured image"}
          </span>
        </div>
      )}
      
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Image Alt Text</label>
        <input 
          type="text" value={altText} onChange={(e) => onAltTextChange(e.target.value)}
          placeholder="Describe the image for SEO & accessibility"
          className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full dark:text-white text-sm"
        />
      </div>
    </div>
  );
}