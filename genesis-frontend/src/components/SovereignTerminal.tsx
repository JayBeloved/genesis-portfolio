"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CLI_ROUTING_INDEX } from "@/lib/cli-index";

export default function SovereignTerminal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cliInput, setCliInput] = useState("");
  const [logs, setLogs] = useState([
    "[SYSTEM] Omnipresent Command Palette Online.", 
    "[SYSTEM] Natural Language Processor Engaged."
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cliInput.trim() !== '') {
      const input = cliInput.trim().toLowerCase();
      
      // NLP Routing
      let route = null;
      let actionName = "";
      if (/(portfolio|projects|case studies)/.test(input)) {
        route = '/portfolio';
        actionName = "The Architectural Ledger";
      } else if (/(library|read|articles|archive)/.test(input)) {
        route = '/library';
        actionName = "The Digital Vault";
      } else if (/(about|who are you|dossier|mandate)/.test(input)) {
        route = '/about';
        actionName = "The Executive Dossier";
      } else if (/(home|start|root)/.test(input)) {
        route = '/';
        actionName = "The Core Seed";
      } else if (/(login|admin|forge)/.test(input)) {
        route = '/forge-gate';
        actionName = "The Forge Gate";
      }

      if (route) {
        setLogs(prev => [...prev, `> ${cliInput}`, `[NLP] Intent recognized. Routing to ${actionName}...`]);
        setTimeout(() => {
          router.push(route as string);
          setIsOpen(false);
          setCliInput("");
        }, 600);
        return;
      }

      // Fallback to strict CLI routes
      const match = CLI_ROUTING_INDEX.find(r => r.command === cliInput.trim());
      if (match) {
        setLogs(prev => [...prev, `> ${cliInput}`, `[ROUTING] Executing ${match.description}...`]);
        setTimeout(() => {
           window.location.href = match.path;
           setIsOpen(false);
        }, 500);
      } else {
        setLogs(prev => [...prev, `> ${cliInput}`, "[ERROR] Invalid directive or unrecognized intent."]);
      }
      setCliInput("");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 bg-obsidian/80 backdrop-blur-md border border-blueprint-dark text-gray-400 font-mono text-[10px] uppercase tracking-widest px-4 py-3 rounded-sm hover:text-sovereign hover:border-sovereign/50 transition-all shadow-[0_0_10px_rgba(26,43,60,0.3)] flex items-center gap-2"
      >
        <span className={`w-2 h-2 ${isOpen ? 'bg-red-500' : 'bg-sovereign animate-pulse'}`}></span> 
        {isOpen ? 'Close Terminal' : 'Terminal [⌘K]'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-obsidian/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black border-2 border-blueprint shadow-[0_0_15px_rgba(26,43,60,0.5)] p-6 rounded-sm backdrop-blur-md relative overflow-hidden h-[500px] flex flex-col w-full mx-auto max-w-4xl animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sovereign to-transparent opacity-20"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-blueprint-dark pb-2">
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">[ COMMAND PALETTE ACTIVE ]</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-sovereign font-mono text-xs">CLOSE [ESC]</button>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 mb-4 scrollbar-hide">
              {logs.map((log, index) => (
                <div key={index} className={log.startsWith('>') ? 'text-white' : log.includes('ERROR') ? 'text-red-500' : 'text-gray-400'}>
                  {log}
                </div>
              ))}
            </div>

            <div className="relative mt-auto pt-4 border-t border-blueprint flex items-center font-mono bg-obsidian-light p-3">
              <span className="text-sovereign mr-2 font-bold select-none">{`J.LAWAL@ESERIA ~ $`}</span>
              <input 
                type="text" 
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
                className="bg-transparent border-none outline-none text-white w-full shadow-none focus:ring-0 placeholder-gray-700"
                placeholder="State your directive..."
              />
              <div className="absolute right-3 w-3 h-5 bg-sovereign animate-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
