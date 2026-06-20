"use client";
import React, { useState, useEffect } from 'react';
import RevenueChart from './RevenueChart';

export default function RevenueAuditAnchor() {
  const [tolerance, setTolerance] = useState<number>(5);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simulated Dataset
  const auditData = [
    { name: 'LATAM Retail', captured: 4500000, leaked: 315000, total: 4815000 },
    { name: 'EMEA Logistics', captured: 12000000, leaked: 450000, total: 12450000 },
    { name: 'APAC Saas', captured: 8500000, leaked: 950000, total: 9450000 },
    { name: 'US Managed Services', captured: 22000000, leaked: 650000, total: 22650000 },
  ];

  const formatCurrency = (val: number) => `$${(val / 1000000).toFixed(1)}M`;

  return (
    <div className="w-full bg-obsidian-light border border-blueprint drop-shadow-sovereign p-4 md:p-8 flex flex-col gap-8 text-gray-300 font-sans">
      
      {/* Header and Controller */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-blueprint-dark pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-tight mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-sovereign animate-pulse rounded-full"></span>
            Algorithmic Revenue Audit
          </h2>
          <p className="font-mono text-sm text-gray-400 capitalize">Identifying orphaned transactions via SQL Window Functions</p>
        </div>
        
        <div className="w-full md:w-64 bg-obsidian p-4 border border-blueprint shadow-inner">
          <label className="flex justify-between items-center text-xs font-mono text-sovereign uppercase tracking-widest mb-3">
            <span>Leakage Tolerance</span>
            <span>{tolerance}%</span>
          </label>
          <input 
            type="range" 
            min="1" 
            max="15" 
            value={tolerance} 
            onChange={(e) => setTolerance(Number(e.target.value))}
            className="w-full h-1 bg-blueprint rounded-none appearance-none cursor-pointer accent-sovereign"
          />
        </div>
      </div>

      {/* Responsive Recharts Container via static import */}
      <div className="w-full h-[400px] overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="min-w-[600px] w-full h-[400px]">
          {isMounted ? (
            <RevenueChart auditData={auditData} tolerance={tolerance} formatCurrency={formatCurrency} />
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center font-mono text-xs text-gray-600 gap-4">
              <span className="block w-8 h-8 border-2 border-dashed border-sovereign-dim rounded-full animate-spin-slow"></span>
              [ BOOTING RECHARTS KERNEL... ]
            </div>
          )}
        </div>
      </div>

      {/* SQL Proof Block */}
      <div className="mt-4 pt-6 border-t border-blueprint-dark">
        <h3 className="font-mono text-xs uppercase text-gray-500 mb-3 tracking-widest">[ DIAGNOSTIC QUERY ENGINE ]</h3>
        <div className="bg-black border border-blueprint-dark p-4 overflow-x-auto relative group">
          <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">PostgreSQL 15</div>
          <pre className="font-mono text-sm text-blue-300 leading-relaxed shadow-none bg-transparent m-0">
            <code>
<span className="text-purple-400">WITH</span> UnmatchedPayments <span className="text-purple-400">AS</span> ({"\n"}
  <span className="text-sovereign">SELECT</span>{"\n"}
    transaction_id,{"\n"}
    amount,{"\n"}
    division_id,{"\n"}
    <span className="text-green-400">SUM</span>(amount) <span className="text-purple-400">OVER</span> (<span className="text-purple-400">PARTITION BY</span> division_id) <span className="text-purple-400">AS</span> local_leaked_sum{"\n"}
  <span className="text-sovereign">FROM</span> core_billing_logs{"\n"}
  <span className="text-sovereign">WHERE</span> invoice_id <span className="text-purple-400">IS NULL</span>{"\n"}
    <span className="text-purple-400">AND</span> status_code = <span className="text-green-300">'SETTLED'</span>{"\n"}
){"\n"}
<span className="text-sovereign">SELECT</span> * <span className="text-sovereign">FROM</span> UnmatchedPayments;
            </code>
          </pre>
        </div>
        <p className="text-xs text-gray-500 italic mt-3 font-mono">
           // Above window function isolates all completely settled stripe payloads that failed to synchronize via the webhook middleware, allowing immediate programmatic recovery.
        </p>
      </div>

    </div>
  );
}
