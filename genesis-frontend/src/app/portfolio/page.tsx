import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { serverFetch } from '@/lib/serverFetch';

export const metadata: Metadata = {
  title: 'Proofs of Work | John J. Lawal',
  description: 'Case studies and technical execution proofs.',
};

export default async function PortfolioIndex() {
  let projects: any[] = [];
  try {
    projects = await serverFetch<any[]>('/portfolio/');
  } catch (error) {
    console.error('Failed to fetch portfolio assets:', error);
  }

  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
           <Link href="/" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span> Terminal Return
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ ROUTE: /portfolio ]</span>
        </div>
      </header>

      <section className="pt-24 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
         <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
              Proofs of Work
            </h1>
            <p className="font-mono text-sm text-gray-400 max-w-2xl mx-auto">
              I do not deal in hypotheticals. These are the technical and economic results of the ESERIA Sovereign Architecture deployed in live, high-stakes enterprise environments.
            </p>
         </div>

         {/* Brutalist Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.length === 0 ? (
              <div className="col-span-1 lg:col-span-2 py-20 text-center border border-blueprint-dark">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest animate-pulse">[ AWAITING ARCHITECTURAL DATA ]</span>
              </div>
            ) : projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group bg-obsidian-light border border-blueprint p-8 md:p-12 hover:border-sovereign transition-colors shadow-brutal flex flex-col justify-between min-h-[400px] relative overflow-hidden">
                 
                 {/* Background Accent */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-sovereign/5 rounded-full blur-3xl group-hover:bg-sovereign/10 transition-colors pointer-events-none"></div>

                 <div>
                    <div className="flex items-center gap-4 mb-8">
                       <span className="font-mono text-2xl md:text-3xl font-bold text-sovereign">
                         {project.anchor_type}
                       </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-tight mb-4 group-hover:text-sovereign transition-colors">
                      {project.title}
                    </h2>
                    
                    <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-md border-l border-blueprint-dark pl-4">
                      {project.meta_description || (project.published_content && project.published_content.substring(0, 120) + '...')}
                    </p>
                 </div>

                 <div className="mt-12 pt-6 border-t border-blueprint-dark flex items-center justify-between">
                    <div className="flex gap-3 flex-wrap">
                       {project.keywords ? project.keywords.split(',').map((tag: string) => tag.trim()).map((tag: string) => (
                         <span key={tag} className="font-mono text-[10px] uppercase tracking-widest text-gray-500 border border-gray-700 px-2 py-1">
                           {tag}
                         </span>
                       )) : (
                         <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 border border-gray-700 px-2 py-1">SOVEREIGN ARCHITECTURE</span>
                       )}
                    </div>
                    <span className="font-mono text-xs text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      Inspect <span className="text-sovereign">&rarr;</span>
                    </span>
                 </div>

              </Link>
            ))}
         </div>
      </section>
    </main>
  );
}
