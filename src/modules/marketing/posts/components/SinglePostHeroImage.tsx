// File: SinglePostHeroImage.tsx
// Folder: src/modules/marketing/posts/components

interface SinglePostHeroImageProps {
  src?: string | null;
  altText?: string | null;
  fallbackTitle: string;
}

export function SinglePostHeroImage({ src, altText, fallbackTitle }: SinglePostHeroImageProps) {
  if (!src) return null;

  return (
    <figure className="mb-12 rounded-2xl overflow-hidden">
      <img 
        src={src} 
        alt={altText || fallbackTitle || "Blog post cover image"} 
        className="w-full object-cover aspect-[21/9]"
      />
    </figure>
  );
}