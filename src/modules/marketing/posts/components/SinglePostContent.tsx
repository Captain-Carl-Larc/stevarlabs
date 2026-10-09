// File: SinglePostContent.tsx
// Folder: src/modules/marketing/posts/components

export function SinglePostContent({ htmlContent }: { htmlContent: string }) {
  return (
    <div 
      className="dark:prose-invert mx-auto prose-img:rounded-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 prose prose-slate md:prose-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}