import React from 'react';

const PILLARS = [
  {
    title: "Sovereign Infrastructure",
    subtitle: "Full-Stack Engineering",
    description: "Constructing robust, decoupled applications using the ESERIA standard—Next.js 15, Django DRF, and Cloud-Native deployments. Built for infinite scale.",
    number: "01"
  },
  {
    title: "Economic Intelligence",
    subtitle: "Data Analytics Engineering",
    description: "Transforming dormant data into an economic moat. From complex ETL pipelines to predictive modeling and high-stakes Business Intelligence dashboards.",
    number: "02"
  },
  {
    title: "High-Yield Automation",
    subtitle: "Business Solutions",
    description: "Architecting process automation, bespoke CRM/ERP modules, and tailored software solutions that eliminate revenue leakage and exponentially boost enterprise productivity.",
    number: "03"
  },
  {
    title: "Frontier R&D",
    subtitle: "AI Orchestration",
    description: "Prototyping and mastering the edge of technology. Integrating Agentic Workflows, generative models, and advanced platform infrastructure to future-proof business operations.",
    number: "04"
  }
];

export default function SovereignPillars() {
  return (
    <section className="bg-obsidian w-full py-20 md:py-32 px-6 md:px-16 lg:px-24">
       <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-sovereign tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-sovereign"></span>
              Core Competencies
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight">The Four Pillars</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <div 
                key={pillar.number} 
                className="group relative bg-obsidian-light border border-blueprint p-6 md:p-8 shadow-brutal hover:border-sovereign hover:shadow-sovereign transition-all duration-500 flex flex-col justify-between min-h-0 md:min-h-[320px]"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                   <span className="text-6xl font-serif text-sovereign leading-none">{pillar.number}</span>
                </div>
                
                <div>
                  <h4 className="text-xl font-serif text-white uppercase tracking-wider mb-1 group-hover:text-sovereign transition-colors">{pillar.title}</h4>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-6">{pillar.subtitle}</span>
                  <p className="text-sm font-mono text-gray-400 leading-relaxed border-l border-blueprint-dark pl-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-blueprint-dark flex items-center justify-between">
                   <span className="w-2 h-2 bg-blueprint group-hover:bg-sovereign transition-colors rounded-full"></span>
                   <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">Eseria Standard</span>
                </div>
              </div>
            ))}
          </div>
       </div>
    </section>
  );
}
