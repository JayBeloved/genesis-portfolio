import MonolithicHero from "@/components/hero/MonolithicHero";
import LexonTransformation from "@/components/LexonTransformation";
import SovereignPillars from "@/components/SovereignPillars";
import ExecutiveDossier from "@/components/ExecutiveDossier";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian text-gray-300 font-sans selection:bg-sovereign selection:text-obsidian">
      
      {/* 1. The Monolithic Seed */}
      <MonolithicHero />

      {/* 2. The Four Pillars (Static Grid) */}
      <SovereignPillars />

      {/* 3. The Mission (Scroll Bound) */}
      <LexonTransformation />

      {/* 4. The Executive Dossier (Gallery) */}
      <ExecutiveDossier />

      {/* 5. The Engineering Altar (Interactive CLI) */}
      <section id="infrastructure" className="pt-24 pb-32 md:pt-32 md:pb-48 px-6 md:px-16 lg:px-24 mx-auto max-w-[1400px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full">
          
          <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6 pt-4 w-full">
            <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wider mb-2 flex items-center gap-3 break-words">
              <span className="w-3 h-3 min-w-[12px] bg-sovereign inline-block flex-shrink-0"></span>
              The Engineering Altar
            </h2>
            <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Bypass conventional navigation. Access the internal Master Seed via natural language or defined CLI directives. All actions are logged and audited.
            </p>
            <div className="border border-blueprint p-4 md:p-6 shadow-brutal bg-obsidian-light w-full overflow-hidden">
               <h3 className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-blueprint-dark pb-2 mb-4 break-words leading-relaxed">Command Syntax Reference</h3>
               <ul className="space-y-4 font-mono text-[10px] md:text-xs text-gray-300 w-full">
                  <li className="flex flex-col gap-1 w-full">
                    <code className="text-sovereign break-all">execute --audit</code>
                    <span className="text-gray-500 break-words">Run Revenue Leakage Scans</span>
                  </li>
                  <li className="flex flex-col gap-1 w-full">
                    <code className="text-sovereign break-all">view --library</code>
                    <span className="text-gray-500 break-words">Apostle Niyi Digital Library</span>
                  </li>
                  <li className="flex flex-col gap-1 w-full">
                    <code className="text-sovereign break-all">init --forge</code>
                    <span className="text-gray-500 break-words">Access Restricted Gateway</span>
                  </li>
               </ul>
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 lg:col-span-8 flex justify-center items-center bg-obsidian-light border border-blueprint-dark p-6 md:p-12 w-full overflow-hidden">
             <div className="text-center w-full max-w-full">
               <span className="w-8 h-8 inline-block border-2 border-sovereign animate-spin mb-4"></span>
               <p className="font-mono text-[10px] md:text-sm text-gray-500 uppercase tracking-widest leading-relaxed break-words max-w-full">
                 [ TERMINAL OFFLOADED TO OMNIPRESENT LAYER ]
               </p>
               <p className="font-mono text-[10px] md:text-xs text-sovereign mt-4 break-words">Press Cmd+K to initialize Command Palette</p>
             </div>
          </div>

        </div>
      </section>

    </main>
  );
}
