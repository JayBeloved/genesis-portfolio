"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function CommandDashboard() {
  const router = useRouter();
  
  // Form State
  const [title, setTitle] = useState('');
  const [anchorType, setAnchorType] = useState('STANDARD');
  const [payload, setPayload] = useState('');
  
  // Execution State
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // POST to the Django S.T.A.R. generation endpoint
      const response = await apiClient.post('/content/generate-star/', {
        title,
        anchor_type: anchorType,
        payload_data: payload
      });

      // Clear the form upon success
      setTitle('');
      setPayload('');
      setSuccessMsg('Generation Successful. The ghostwriter has finalized the architecture.');

    } catch (err: any) {
      setErrorMsg(typeof err === 'string' ? err : err?.detail || 'Execution Failed. The network mandate was rejected.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0;';
    router.push('/forge-gate');
  };

  return (
    <div className="pb-32">
       <section className="px-6 md:px-16 mt-12 max-w-[1200px] mx-auto">
          <div className="mb-12 border-b border-blueprint-dark pb-6">
            <h1 className="text-4xl font-serif text-white uppercase tracking-tight mb-2">S.T.A.R. Ingestion Protocol</h1>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Situation // Task // Action // Result Ghostwriter Pipeline</p>
          </div>

          <form onSubmit={handleExecute} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Col: Controls */}
            <div className="lg:col-span-1 space-y-8 bg-obsidian-light p-6 border border-blueprint shadow-brutal flex flex-col justify-between">
               <div className="space-y-6">
                 <div className="flex flex-col gap-2">
                   <label className="font-mono text-[10px] text-sovereign uppercase tracking-widest">Document Title</label>
                   <input 
                     type="text" 
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="bg-black border border-blueprint text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-sovereign transition-colors w-full"
                     placeholder="e.g. Architecting Zero-Waste Concurrency"
                     required
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="font-mono text-[10px] text-sovereign uppercase tracking-widest">Anchor Classification</label>
                   <select 
                     value={anchorType}
                     onChange={(e) => setAnchorType(e.target.value)}
                     className="bg-black border border-blueprint text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-sovereign transition-colors w-full appearance-none"
                   >
                     <option value="AUDIT">Revenue Leakage Audit</option>
                     <option value="INTELLIGENCE">Economic Intelligence</option>
                     <option value="STANDARD">Standard Execution</option>
                   </select>
                 </div>
               </div>

               {/* Latency Protocol Notification Layer */}
               <div className="mt-8 min-h-[100px] border-t border-blueprint-dark pt-6 flex flex-col justify-end">
                  {loading && (
                    <div className="flex flex-col items-start gap-3">
                      <span className="w-full h-[1px] bg-gradient-to-r from-sovereign to-transparent animate-pulse"></span>
                      <p className="font-mono text-xs text-sovereign uppercase tracking-widest animate-pulse leading-loose">
                        Uplinking to Gemini 1.5 Pro...<br/>
                        Processing Architecture...
                      </p>
                    </div>
                  )}
                  {successMsg && (
                    <div className="bg-green-900/20 border border-green-500/50 p-4 font-mono text-xs text-green-400">
                      [SYS]: {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div className="bg-red-900/20 border border-red-500/50 p-4 font-mono text-xs text-red-400">
                      [ERR]: {errorMsg}
                    </div>
                  )}
               </div>
            </div>

            {/* Right Col: Payload Ingestion */}
            <div className="lg:col-span-2 flex flex-col">
               <label className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3 flex justify-between items-center">
                 <span>Raw Payload Injection</span>
                 <span className="text-[10px] bg-obsidian-light border border-blueprint px-2 py-1">[ JSON / TXT ]</span>
               </label>
               <textarea 
                 value={payload}
                 onChange={(e) => setPayload(e.target.value)}
                 className="w-full h-[500px] bg-black border border-blueprint text-gray-300 font-mono text-sm p-6 focus:outline-none focus:border-sovereign transition-colors resize-none shadow-inner"
                 placeholder="Paste raw project constraints, situation details, and architectural metrics here..."
                 required
               />
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="mt-6 w-full bg-sovereign text-black font-mono text-sm uppercase tracking-[0.2em] font-bold py-6 border border-transparent hover:bg-white transition-colors disabled:opacity-20 disabled:cursor-wait shadow-sovereign"
               >
                 {loading ? 'EXECUTING...' : 'EXECUTE GHOSTWRITER'}
               </button>
            </div>

          </form>
       </section>
    </div>
  );
}
