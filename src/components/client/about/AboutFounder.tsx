// File: AboutFounder.tsx
// Route/Folder: src/components/client/about
// Purpose: Founder bio integrating clinical background and explanation of the remote business model.
// Imports: next/image
// Used in: src/app/(public)/about/page.tsx

import Image from "next/image";

export default function AboutFounder() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        
        <div className="items-center gap-10 grid md:grid-cols-[1fr_2fr] mb-16">
          <div className="relative bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl aspect-square overflow-hidden">
            <Image
              src="/founder-photo.png"
              alt="Stephen Kalwenzi Mutwii, founder of Stevarlabs"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-2 font-bold text-slate-900 dark:text-white text-2xl">Who is behind Stevarlabs</h2>
            <p className="mb-6 font-medium text-blue-600 dark:text-blue-500 text-lg">Stephen Kalwenzi Mutwii</p>
            
            <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Stevarlabs was built to bridge the gap between clinical excellence and digital growth. As a software developer with a foundation in clinical nursing and public health, I understand how healthcare environments actually run—from patient anxiety to rigid regulatory frameworks. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              That background shapes exactly how we work with dental practices: prioritising trust, communicating clearly, and ensuring every patient touchpoint online is compliant, professional, and built to convert.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">How we work with UK practices</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Stevarlabs works with dental practices across the UK remotely, so you won't pay for an office or agency overhead. We operate a highly responsive, asynchronous model and are fully available by email and scheduled calls whenever you need us.
          </p>
        </div>

      </div>
    </section>
  );
}