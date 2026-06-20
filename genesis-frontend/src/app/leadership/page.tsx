import Link from "next/link";
import Image from "next/image";

export default function LeadershipGallery() {
  return (
    <main className="min-h-screen bg-obsidian text-gray-300 selection:bg-sovereign selection:text-obsidian pb-32">
      
      {/* Header */}
      <header className="border-b border-blueprint-dark py-12 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <Link href="/" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
              <span className="text-xl leading-none">&larr;</span> Return to Base
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight uppercase">
              Gallery of Authority
            </h1>
          </div>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest text-right max-w-sm">
            Visual verification of institutional speaking engagements, principal consulting, and corporate mandates.
          </p>
        </div>
      </header>

      {/* Masonry Grid (Asymmetric CSS Columns) */}
      <section className="pt-16 px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          
          {/* Card 1 */}
          <div className="break-inside-avoid relative group cursor-pointer shadow-brutal border border-blueprint hover:border-sovereign transition-colors duration-500 bg-obsidian-light p-2 pb-6">
            <div className="relative w-full aspect-[4/5] bg-[#141d26] overflow-hidden mb-4 border border-blueprint">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-600 tracking-widest flex-col gap-2 opacity-50">
                 <span className="block w-8 h-8 border border-dashed border-gray-600 rounded-full"></span>
                 [ IMPACT PHOTOGRAPHY ]
              </div>
              {/* Optional grayscale to color hover effect */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="px-4 border-l-2 border-sovereign">
              <h3 className="font-serif text-lg text-white uppercase tracking-wide mb-1">Global Leadership Summit 2026</h3>
              <p className="font-mono text-xs text-gray-400 capitalize">Keynote: Algorithmic Architecture</p>
            </div>
          </div>

          {/* Card 2 - Wider/Different Aspect */}
          <div className="break-inside-avoid relative group cursor-pointer shadow-brutal border border-blueprint hover:border-sovereign transition-colors duration-500 bg-obsidian-light p-2 pb-6">
            <div className="relative w-full aspect-video bg-[#101820] overflow-hidden mb-4 border border-blueprint">
               <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-600 tracking-widest opacity-50">
                 [ EXECUTIVE CONSULTING PRESS KIT ]
               </div>
            </div>
            <div className="px-4 border-l-2 border-sovereign">
              <h3 className="font-serif text-lg text-white uppercase tracking-wide mb-1">Lexon Enterprise Audit</h3>
              <p className="font-mono text-xs text-gray-400 capitalize">Identified $1.4M Revenue Leakage</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="break-inside-avoid relative group cursor-pointer shadow-brutal border border-blueprint hover:border-sovereign transition-colors duration-500 bg-obsidian-light p-2 pb-6">
            <div className="relative w-full aspect-[3/4] bg-[#0c1218] overflow-hidden mb-4 border border-blueprint">
               <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-600 tracking-widest opacity-50">
                 [ HIGH-RES PORTRAIT ]
               </div>
            </div>
            <div className="px-4 border-l-2 border-sovereign">
              <h3 className="font-serif text-lg text-white uppercase tracking-wide mb-1">Sovereign Masterclass</h3>
              <p className="font-mono text-xs text-gray-400 capitalize">Data Science & Financial Economics</p>
            </div>
          </div>

           {/* Card 4 */}
           <div className="break-inside-avoid relative group cursor-pointer shadow-brutal border border-blueprint hover:border-sovereign transition-colors duration-500 bg-obsidian-light p-2 pb-6">
            <div className="relative w-full aspect-square bg-[#141b22] overflow-hidden mb-4 border border-blueprint">
               <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-600 tracking-widest flex-col gap-2 opacity-50">
                 <span className="block w-6 h-6 border rotate-45 border-gray-600"></span>
                 [ IMPACT PHOTOGRAPHY ]
               </div>
            </div>
            <div className="px-4 border-l-2 border-blueprint group-hover:border-sovereign transition-colors">
              <h3 className="font-serif text-lg text-white uppercase tracking-wide mb-1">Venture Capital Boardroom</h3>
              <p className="font-mono text-xs text-gray-400 capitalize">Deal Structuring & Valuation</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
