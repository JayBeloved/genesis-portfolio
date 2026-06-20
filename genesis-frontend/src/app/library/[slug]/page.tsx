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
  title: 'Asset Detail | Digital Vault',
};

export default async function LibraryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let asset = null;
  try {
    const results = await serverFetch<any[]>(`/library/?slug=${slug}`);
    if (results && results.length > 0) {
      asset = results[0];
    }
  } catch (error) {
    console.error('Failed to fetch library asset:', error);
  }

  if (!asset) {
    notFound();
  }

  const isVideo = asset.keywords?.includes('video');

  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
           <Link href="/library" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span> Back to Ledger
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ ASSET: {slug.substring(0, 15)}... ]</span>
        </div>
      </header>

      <article className="px-6 md:px-16 mt-16 max-w-3xl mx-auto">
         {/* Asset Metadata Header */}
         <div className="mb-12 border-b border-blueprint-dark pb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-obsidian bg-sovereign inline-block px-3 py-1 font-bold">
                {isVideo ? 'Video Seminar' : 'Technical Document'}
              </span>
              <span className="font-mono text-xs text-gray-500">{new Date(asset.created_at).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight leading-none">
              {asset.title}
            </h1>
         </div>

         {/* Video Subsystem */}
         {isVideo && (
           <div className="mb-16 border border-blueprint bg-black p-2 shadow-brutal">
             <div className="relative w-full aspect-video bg-obsidian-light flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-500 tracking-widest flex-col gap-2">
                   <span className="block w-8 h-8 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                     <span className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-sovereign border-b-4 border-b-transparent ml-1"></span>
                   </span>
                   [ SECURE VIDEO STREAM REQUIRED ]
                </div>
             </div>
           </div>
         )}

         {/* Markdown Engine */}
         <div>
            <MDXRemote 
              source={asset.content.replace(/<(?=[0-9\s])/g, '&lt;')} 
              components={sovereignComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'md' } }} 
            />
         </div>

         {/* The Signature */}
         <div className="mt-32 pt-8 border-t border-blueprint-dark flex flex-col items-center justify-center text-center">
             <div className="w-12 h-1 bg-sovereign mb-6"></div>
             <p className="font-serif text-2xl text-white italic mb-2">John J. Lawal</p>
             <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Enterprise Architect & Principal</p>
         </div>
      </article>
    </main>
  );
}
