import React from 'react';
import Link from 'next/link';

export default function SovereignFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-blueprint-dark py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Col: Massive Branding & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="w-16 h-1 bg-sovereign mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter uppercase leading-none mb-4">
              Initiate <br />
              <span className="text-gray-500">The Mandate.</span>
            </h2>
            <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-sm mb-8">
              Access reserved for high-yield enterprises, sovereign funds, and tier-one operational leaders.
            </p>
            <a 
              href="mailto:contact@johnjaylawal.org" 
              className="inline-block px-8 py-4 border border-sovereign text-sovereign font-mono text-xs uppercase tracking-[0.2em] hover:bg-sovereign hover:text-black transition-colors shadow-sovereign"
            >
              Request Executive Briefing
            </a>
          </div>
        </div>

        {/* Right Col: Navigation Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-mono uppercase tracking-widest mt-8 lg:mt-0 border-t border-blueprint-dark pt-8 lg:border-t-0 lg:pt-0">
          
          <div className="flex flex-col gap-4">
             <span className="text-gray-600 mb-2">Protocols</span>
             <Link href="/portfolio/revenue-audit" className="text-gray-400 hover:text-white transition-colors">Revenue Audit</Link>
             <Link href="#infrastructure" className="text-gray-400 hover:text-white transition-colors">The Altar (CLI)</Link>
             <Link href="/leadership" className="text-gray-400 hover:text-white transition-colors">Executive Gallery</Link>
          </div>

          <div className="flex flex-col gap-4">
             <span className="text-gray-600 mb-2">Systems</span>
             <Link href="/architecture" className="text-gray-400 hover:text-white transition-colors">ESERIA Standard</Link>
             <Link href="/ai" className="text-gray-400 hover:text-white transition-colors">S.T.A.R. AI Engine</Link>
             <Link href="/about" className="text-gray-400 hover:text-white transition-colors">Principal Profile</Link>
          </div>

          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
             <span className="text-gray-600 mb-2">Connect</span>
             <a href="https://linkedin.com/in/johnjaylawal" target="_blank" rel="noopener noreferrer" className="text-sovereign hover:text-white transition-colors">LinkedIn</a>
             <a href="https://github.com/johnjaylawal" target="_blank" rel="noopener noreferrer" className="text-sovereign hover:text-white transition-colors">GitHub Repository</a>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-blueprint-dark flex flex-col md:flex-row justify-between items-center gap-4">
         <p className="font-mono text-xs text-gray-600 uppercase tracking-widest">
           &copy; {currentYear} John J. Lawal. All rights reserved.
         </p>
         <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">Powered by ESERIA Sovereign Architecture</p>
         </div>
      </div>
    </footer>
  );
}
