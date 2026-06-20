import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { serverFetch } from '@/lib/serverFetch';
import { sovereignComponents } from '@/components/MDXComponents';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Case Study | Proofs of Work',
};

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let caseStudy = null;
  try {
    const results = await serverFetch<any[]>(`/portfolio/?slug=${slug}`);
    if (results && results.length > 0) {
      caseStudy = results[0];
    }
  } catch (error) {
    console.error('Failed to fetch portfolio asset:', error);
  }

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
           <Link href="/portfolio" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span> Back to Index
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ CASE_STUDY: {slug} ]</span>
        </div>
      </header>

      {/* Hero Header */}
      <section className="bg-obsidian-light border-b border-blueprint-dark pt-16 pb-24 px-6 md:px-16 lg:px-24 mb-16">
         <div className="max-w-[1000px] mx-auto text-center">
             <div className="inline-block border border-sovereign px-4 py-1 mb-8 shadow-sovereign bg-black">
               <span className="text-xs font-mono text-sovereign tracking-[0.2em] uppercase">Architecture: {caseStudy.anchor_type}</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tight leading-none mb-8">
               {caseStudy.title}
             </h1>
             <div className="flex items-center justify-center gap-8 font-mono text-xs text-gray-500 uppercase tracking-widest border-t border-blueprint-dark pt-8 w-max mx-auto px-12">
                <span>Date: {new Date(caseStudy.created_at).toLocaleDateString()}</span>
             </div>
         </div>
      </section>

      {/* Markdown Content */}
      <article className="px-6 md:px-16 max-w-3xl mx-auto">
         <div>
            <MDXRemote 
              source={caseStudy.published_content.replace(/<(?=[0-9\s])/g, '&lt;')} 
              components={sovereignComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'md' } }} 
            />
         </div>

         {caseStudy.media_gallery && caseStudy.media_gallery.length > 0 && (
           <div className="mt-16 border-t border-blueprint-dark pt-12">
             <h3 className="font-serif text-2xl text-white mb-8 uppercase tracking-tight">Architectural Schematics</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {caseStudy.media_gallery.map((media: any) => (
                 <div key={media.id} className="border border-blueprint p-2 bg-obsidian-light">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={media.file} alt={media.alt_text} className="w-full h-auto" />
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Return CTA */}
         <div className="mt-32 pt-8 border-t border-blueprint-dark flex justify-between items-center">
             <Link href="/portfolio" className="font-mono text-sm text-sovereign hover:text-white uppercase tracking-widest transition-colors">
               &larr; View All Proofs
             </Link>
             <a href="mailto:contact@johnjaylawal.org" className="bg-sovereign text-black font-mono text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-white transition-colors shadow-sovereign">
               Initiate Mandate
             </a>
         </div>
      </article>
    </main>
  );
}
