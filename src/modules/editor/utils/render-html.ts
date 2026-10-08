// File: render-html.ts
// Folder: src/modules/editor/utils
// Description: Converts Tiptap JSON into an HTML string for server-side rendering (SEO).

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export function renderTiptapHTML(jsonContent: string | any) {
  if (!jsonContent) return "";
  
  try {
    // Handle both stringified JSON from DB or raw JSON objects
    const content = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
    
    return generateHTML(content, [
      StarterKit,
      Underline,
      Image.configure({ 
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto shadow-sm my-6" } 
      }),
      Link.configure({
        HTMLAttributes: { class: "text-blue-600 underline hover:text-blue-800 dark:text-blue-400" }
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ]);
  } catch (error) {
    console.error("Failed to parse and render Tiptap JSON:", error);
    return "<p>Error loading content.</p>";
  }
}