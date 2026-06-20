import React from 'react';

const DOSSIER_IMAGES = [
  { title: "Summit 2026 Keynote", caption: "Algorithmic Architecture", aspect: "aspect-[4/5]" },
  { title: "Enterprise Audit", caption: "Revenue Leakage Scanned", aspect: "aspect-video" },
  { title: "Sovereign Masterclass", caption: "Financial Economics", aspect: "aspect-square" },
  { title: "Venture Boardroom", caption: "Deal Structuring", aspect: "aspect-[3/4]" },
  { title: "R&D Prototyping", caption: "Agentic AI Integration", aspect: "aspect-[16/9]" },
];

export default function ExecutiveDossier() {
  return (
    <section className="relative w-full py-32 bg-[url('/bg-exec.png')] bg-cover bg-center bg-fixed">
       <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm z-0"></div>
       
       <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="text-center mb-20">
             <div className="inline-block border border-sovereign px-4 py-1 mb-6 shadow-sovereign">
               <span className="text-xs font-mono text-sovereign tracking-[0.2em] uppercase">Visual Record</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter uppercase drop-shadow-lg">The Mandate in Motion</h2>
          </div>

          {/* Asymmetric Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {DOSSIER_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid relative group cursor-pointer shadow-brutal border border-blueprint hover:border-sovereign transition-all duration-500 bg-obsidian-light p-2 pb-6"
              >
                <div className={`relative w-full ${img.aspect} bg-[#141d26] overflow-hidden mb-4 border border-blueprint flex flex-col items-center justify-center`}>
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-500 tracking-widest flex-col gap-2 opacity-50 z-0">
                     <span className="block w-6 h-6 border-2 border-dashed border-gray-600 rotate-45"></span>
                     [ SECURE IMAGERY ]
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity z-10"></div>
                </div>
                <div className="px-4 border-l-2 border-blueprint group-hover:border-sovereign transition-colors">
                  <h3 className="font-serif text-lg text-white uppercase tracking-wide mb-1">{img.title}</h3>
                  <p className="font-mono text-xs text-gray-400 capitalize">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
       </div>
    </section>
  );
}
