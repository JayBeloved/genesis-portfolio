"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgeGateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Do not show the layout on the login terminal
  if (pathname === '/forge-gate') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0;';
    router.push('/forge-gate');
  };

  return (
    <div className="min-h-screen bg-obsidian flex font-sans text-gray-300">
      {/* Brutalist Sidebar */}
      <aside className="w-64 border-r border-blueprint-dark bg-black shrink-0 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto shadow-brutal z-10">
        <div>
           <div className="p-6 border-b border-blueprint-dark mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-sovereign rounded-full"></span>
              <span className="font-mono text-xs text-white tracking-widest uppercase font-bold">Control Room</span>
           </div>
           
           <nav className="flex flex-col px-4 gap-2">
              <Link 
                href="/forge-gate/dashboard" 
                className={`p-3 font-mono text-[10px] uppercase tracking-widest transition-colors border ${pathname === '/forge-gate/dashboard' ? 'bg-sovereign text-black border-sovereign font-bold' : 'text-gray-400 border-transparent hover:border-blueprint'}`}
              >
                Ghostwriter Terminal
              </Link>
              
              <Link 
                href="/forge-gate/portfolio" 
                className={`p-3 font-mono text-[10px] uppercase tracking-widest transition-colors border ${pathname.startsWith('/forge-gate/portfolio') ? 'bg-sovereign text-black border-sovereign font-bold' : 'text-gray-400 border-transparent hover:border-blueprint'}`}
              >
                Portfolio Ledger
              </Link>
              
              <Link 
                href="/forge-gate/library" 
                className={`p-3 font-mono text-[10px] uppercase tracking-widest transition-colors border ${pathname.startsWith('/forge-gate/library') ? 'bg-sovereign text-black border-sovereign font-bold' : 'text-gray-400 border-transparent hover:border-blueprint'}`}
              >
                Library Ledger
              </Link>
              
              <Link 
                href="/forge-gate/settings" 
                className={`p-3 font-mono text-[10px] uppercase tracking-widest transition-colors border ${pathname.startsWith('/forge-gate/settings') ? 'bg-sovereign text-black border-sovereign font-bold' : 'text-gray-400 border-transparent hover:border-blueprint'}`}
              >
                System Settings
              </Link>
           </nav>
        </div>
        
        <div className="p-4 border-t border-blueprint-dark">
           <button 
             onClick={handleLogout} 
             className="w-full text-left p-3 font-mono text-[10px] text-red-500 hover:bg-red-950/20 transition-colors uppercase tracking-widest border border-transparent hover:border-red-900"
           >
             Sever Connection
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
