// File: SinglePostHeader.tsx
// Folder: src/modules/marketing/posts/components

interface SinglePostHeaderProps {
  title: string;
  categoryName: string;
  authorName: string;
  publishedAt?: Date | null;
  metaDescription?: string | null;
}

export function SinglePostHeader({ 
  title, 
  categoryName, 
  authorName, 
  publishedAt, 
  metaDescription 
}: SinglePostHeaderProps) {
  
  let formattedDate = "";
  if (publishedAt) {
    try {
      formattedDate = new Date(publishedAt).toLocaleDateString('en-US', { 
        month: 'long', day: 'numeric', year: 'numeric' 
      });
    } catch (e) {
      formattedDate = "Recently Published";
    }
  }

  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-2 mb-4 font-semibold text-sm uppercase tracking-wider">
        <span className="text-blue-600 dark:text-blue-400">{categoryName}</span>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <span className="text-slate-600 dark:text-slate-300 capitalize">{authorName}</span>
        {formattedDate && (
          <>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500">{formattedDate}</span>
          </>
        )}
      </div>
      <h1 className="mb-6 font-extrabold text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
        {title}
      </h1>
      {metaDescription && (
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl">
          {metaDescription}
        </p>
      )}
    </header>
  );
}