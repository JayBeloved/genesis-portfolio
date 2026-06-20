import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { serverFetch } from '@/lib/serverFetch';

export const metadata: Metadata = {
  title: 'Digital Vault | John J. Lawal',
  description: 'The personal intellectual property vault of John J. Lawal.',
};

export default async function LibraryIndex() {
  let assets: any[] = [];
  try {
    assets = await serverFetch<any[]>('/library/');
  } catch (error) {
    console.error('Failed to fetch library assets:', error);
  }

  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
           <Link href="/" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span> Return to Gateway
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ ROUTE: /library ]</span>
        </div>
      </header>

      <section className="pt-24 px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto">
         <div className="mb-16 border-b-2 border-blueprint-dark pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight leading-none mb-4">
                The Archive Ledger
              </h1>
              <p className="font-mono text-sm text-gray-400">
                Institutional Knowledge / Technical Directives / Executive Seminars
              </p>
            </div>
            {/* Visual Filters */}
            <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
               <span className="text-sovereign cursor-pointer border-b border-sovereign pb-1">All Assets</span>
               <span className="cursor-pointer hover:text-white transition-colors">Research</span>
               <span className="cursor-pointer hover:text-white transition-colors">Video</span>
            </div>
         </div>

         {/* Ledger Rows */}
         <div className="flex flex-col">
            {assets.length === 0 ? (
              <div className="py-20 text-center border border-blueprint-dark">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest animate-pulse">[ VAULT EMPTY OR ENCRYPTED ]</span>
              </div>
            ) : assets.map((asset) => (
              <Link key={asset.slug} href={`/library/${asset.slug}`} className="group relative border-b border-blueprint hover:bg-obsidian-light transition-colors py-8 px-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 
                 {/* Metadata Left */}
                 <div className="flex flex-col gap-2 md:w-1/4">
                    <span className="font-mono text-xs text-gray-500">
                      {new Date(asset.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sovereign bg-sovereign/10 inline-block px-2 py-1 border border-sovereign/30 w-max">
                      {asset.keywords?.includes('video') ? 'Video Seminar' : 'Technical Document'}
                    </span>
                 </div>

                 {/* Title Center */}
                 <div className="md:w-1/2">
                    <h2 className="text-2xl font-serif text-white group-hover:text-sovereign transition-colors tracking-wide leading-tight">
                      {asset.title}
                    </h2>
                 </div>

                 {/* Action/Lock Right */}
                 <div className="md:w-1/4 flex justify-end items-center">
                    {asset.keywords?.includes('premium') ? (
                      <div className="flex items-center gap-2 font-mono text-xs text-gray-500 uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <span>Gated</span>
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Entry &rarr;
                      </span>
                    )}
                 </div>
              </Link>
            ))}
         </div>
      </section>
    </main>
  );
}
