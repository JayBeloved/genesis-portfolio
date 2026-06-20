import RevenueAuditAnchor from "@/components/anchors/RevenueAuditAnchor";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revenue Leakage Audit | John J. Lawal',
  description: 'Proving full stack resilience via Algorithmic Revenue Discovery.',
};

export default function PortfolioRevenueAudit() {
  return (
    <main className="min-h-screen bg-obsidian font-sans pb-32">
       {/* Minimal Nav Header */}
       <header className="border-b border-blueprint-dark py-6 px-6 md:px-16 lg:px-24 sticky top-0 bg-obsidian/90 backdrop-blur-md z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
           <Link href="/" className="font-mono text-xs text-sovereign uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sovereign rounded-full"></span> Back to Primary Terminal
            </Link>
            <span className="font-mono text-xs text-gray-500 tracking-widest">[ ROUTE: /portfolio/revenue-audit ]</span>
        </div>
      </header>

      {/* Main Content Body */}
      <section className="pt-24 px-6 md:px-16 lg:px-24 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        

        {/* Left Exec Narrative Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h1 className="text-4xl font-serif text-white uppercase tracking-tight leading-none mb-4">
             Securing the <br/>
             <span className="text-gray-400">Economic Perimeter.</span>
          </h1>
          <p className="font-mono text-sm text-gray-300 leading-relaxed border-l-2 border-sovereign pl-4">
             "High-growth enterprises often suffer from API desynchronization. A payment settles in Stripe, but a server timeout prevents the webhook from generating a local invoice."
          </p>
          <p className="font-mono text-xs text-gray-500 leading-relaxed">
             This interactive anchor demonstrates the exact logic employed by the Principal Architect to isolate, aggregate, and rescue millions in orphaned transactional revenue over a single fiscal quarter. 
          </p>
          
          <div className="mt-8 p-6 bg-[#0c1218] border border-blueprint">
            <h3 className="text-sovereign font-mono text-xs tracking-widest uppercase mb-4">Outcome Magnitude</h3>
            <ul className="space-y-4 font-mono text-sm text-white">
              <li className="flex justify-between border-b border-blueprint pb-2">
                 <span className="text-gray-400">Leaked Capital Rescued</span>
                 <span>$2.4M</span>
              </li>
               <li className="flex justify-between border-b border-blueprint pb-2">
                 <span className="text-gray-400">Algorithm Latency</span>
                 <span>42ms</span>
              </li>
               <li className="flex justify-between">
                 <span className="text-gray-400">Operational ROI</span>
                 <span>1400%</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
             <button className="w-full font-mono uppercase tracking-widest text-xs py-4 border-2 border-sovereign text-sovereign hover:bg-sovereign hover:text-black transition-colors">
               Schedule Architecture Audit
             </button>
          </div>
        </div>

        {/* Right Anchor (Interactive Dashboard) */}
        <div className="lg:col-span-8 flex items-start justify-end">
           <RevenueAuditAnchor />
        </div>

      </section>
    </main>
  );
}
