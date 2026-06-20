import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Dossier | John J. Lawal',
  description: 'The Sunk Cost Timeline and Architectural Stack Matrix of John J. Lawal.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
           <Link href="/" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full animate-pulse"></span> Terminal Return
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ ROUTE: /about ]</span>
        </div>
      </header>

      {/* Split Header */}
      <section className="pt-24 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
         {/* Left Side: Portrait */}
         <div className="relative w-full aspect-[4/5] bg-obsidian-light border border-blueprint p-4 shadow-brutal flex items-center justify-center group overflow-hidden">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiMxYTIiIHN0eWxlPSJvcGFjaXR5OjAuMTEiLz48L3N2Zz4=')] opacity-20 pointer-events-none z-10 mix-blend-overlay"></div>
             <Image src="/JJL_PP4.png" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0" alt="John J. Lawal" priority />
             {/* Fallback if no image yet */}
             <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-500 tracking-widest flex-col gap-2 -z-10">
                <span className="block w-6 h-6 border-2 border-dashed border-gray-600 rotate-45"></span>
                [ EXECUTIVE PORTRAIT ]
             </div>
         </div>

         {/* Right Side: Manifesto */}
         <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight leading-none mb-8">
              Breaking Ignorance.<br/>
              <span className="text-sovereign">Building Systems.</span><br/>
              Delivering Results.
            </h1>
            <div className="border-l-2 border-blueprint pl-6 py-2 mb-10">
              <p className="text-lg md:text-xl font-serif text-gray-300 leading-relaxed italic">
                 "I do not accept the premise of impossibility. Where there is a business bottleneck, there is a technical architecture waiting to obliterate it. I engineer the bridge between untapped potential and absolute economic performance."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 font-mono text-sm uppercase tracking-widest text-gray-400">
               <div>
                 <span className="block text-white mb-2 text-xs">Origin</span>
                 <span>Abuja, Nigeria</span>
               </div>
               <div>
                 <span className="block text-white mb-2 text-xs">Operation</span>
                 <span>Global Scope</span>
               </div>
               <div>
                 <span className="block text-white mb-2 text-xs">Framework</span>
                 <span>ESERIA Standard</span>
               </div>
               <div>
                 <span className="block text-white mb-2 text-xs">Asset Class</span>
                 <span>High-Yield Equity</span>
               </div>
            </div>
         </div>
      </section>

      {/* Sunk Cost Timeline */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1000px] mx-auto mb-32">
         <div className="mb-16 border-b border-blueprint-dark pb-6">
            <h2 className="text-sm font-mono text-sovereign tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-sovereign"></span>
              Historical Vectors
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tight">The Sunk Cost Timeline</h3>
         </div>

         <div className="relative border-l-2 border-blueprint ml-4 space-y-16">
            
            {/* Node 1 */}
            <div className="relative pl-10">
               <div className="absolute left-[-9px] top-1.5 w-4 h-4 bg-obsidian border-2 border-sovereign rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
               <span className="font-mono text-xs text-sovereign tracking-widest uppercase block mb-2">Phase I</span>
               <h4 className="text-2xl font-serif text-white uppercase mb-2">MSc Research (Econometrics)</h4>
               <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-2xl">
                 Established the mathematical foundation. Deep focus on statistical modeling, time-series forecasting, and the structural dynamics of economic scaling.
               </p>
            </div>

            {/* Node 2 */}
            <div className="relative pl-10">
               <div className="absolute left-[-9px] top-1.5 w-4 h-4 bg-obsidian border-2 border-sovereign rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
               <span className="font-mono text-xs text-sovereign tracking-widest uppercase block mb-2">Phase II</span>
               <h4 className="text-2xl font-serif text-white uppercase mb-2">The Genesis of Lexon Framework</h4>
               <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-2xl">
                 The initial conceptualization of an immutable, decoupled development framework designed to eliminate software fragmentation.
               </p>
            </div>

             {/* Node 3 */}
             <div className="relative pl-10">
               <div className="absolute left-[-9px] top-1.5 w-4 h-4 bg-obsidian border-2 border-sovereign rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
               <span className="font-mono text-xs text-sovereign tracking-widest uppercase block mb-2">Phase III</span>
               <h4 className="text-2xl font-serif text-white uppercase mb-2">Founding of Eseria Global</h4>
               <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-2xl">
                 Operationalizing the framework into an enterprise consultancy. Deploying high-yield automated solutions, from React/Next.js frontends to heavily decoupled Django DRF backend fortresses.
               </p>
            </div>

            {/* Node 4 */}
            <div className="relative pl-10">
               <div className="absolute left-[-9px] top-1.5 w-4 h-4 bg-sovereign border-2 border-white rounded-full shadow-[0_0_25px_rgba(212,175,55,1)] animate-pulse"></div>
               <span className="font-mono text-xs text-white tracking-widest uppercase block mb-2">Terminal Phase</span>
               <h4 className="text-2xl font-serif text-sovereign uppercase mb-2">The 2037 Target</h4>
               <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-2xl">
                 The billion-dollar mandate. Absolute technological deployment across Pan-African and Global infrastructure, commanding data sovereignty and unyielding operational excellence.
               </p>
            </div>

         </div>
      </section>

      {/* The Stack Matrix */}
      <section className="px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-mono text-white uppercase tracking-widest flex items-center justify-center gap-4">
              [ THE STACK MATRIX ]
            </h3>
         </div>

         <div className="bg-black border border-blueprint p-1 flex flex-col md:flex-row shadow-brutal">
            {/* Terminal Sidebar */}
            <div className="bg-obsidian-light border-r border-blueprint p-4 md:w-64 flex flex-col gap-2 font-mono text-[10px] text-gray-600 uppercase tracking-widest hidden md:flex">
               <span>{'>> root@eseria-core:~#'}</span>
               <span className="text-sovereign">Running diagnostic...</span>
               <span>Loading kernels...</span>
               <span className="text-green-500">Systems Online</span>
            </div>
            
            {/* Grid Area */}
            <div className="w-full p-6 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
               {/* Pillar 1 */}
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sovereign border-b border-blueprint pb-2 mb-4 uppercase">Frontend Forge</span>
                  <ul className="space-y-3 font-mono text-sm text-gray-300">
                    <li>Next.js 15 (RSC)</li>
                    <li>React 19</li>
                    <li>Tailwind CSS</li>
                    <li>Framer / Recharts</li>
                  </ul>
               </div>
               {/* Pillar 2 */}
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sovereign border-b border-blueprint pb-2 mb-4 uppercase">Logic Fortress</span>
                  <ul className="space-y-3 font-mono text-sm text-gray-300">
                    <li>Django 4.2+ (ASGI)</li>
                    <li>Django REST Framework</li>
                    <li>Celery / Redis</li>
                    <li>PostgreSQL 15</li>
                  </ul>
               </div>
               {/* Pillar 3 */}
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sovereign border-b border-blueprint pb-2 mb-4 uppercase">Cloud Natives</span>
                  <ul className="space-y-3 font-mono text-sm text-gray-300">
                    <li>AWS (EC2, S3, RDS)</li>
                    <li>Kubernetes / Docker</li>
                    <li>Vercel Edge Network</li>
                    <li>Terraform IaC</li>
                  </ul>
               </div>
               {/* Pillar 4 */}
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sovereign border-b border-blueprint pb-2 mb-4 uppercase">Agentic Workflows</span>
                  <ul className="space-y-3 font-mono text-sm text-gray-300">
                    <li>Google Gemini 1.5 Pro</li>
                    <li>Vector DBs</li>
                    <li>Custom RAG Pipelines</li>
                    <li>Automated S.T.A.R. Generation</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
