"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function ForgeGateLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Execute authentication
      const response: any = await apiClient.post('/auth/token/', { email, password });
      // console.log("Sovereign Payload:", response); 
      
      // We expect the apiClient to unwrap the response and give us the token payload.
      if (response && response.access) {
        // Environmental handshake: Enforce 'secure' only in production (HTTPS)
        const isSecure = window.location.protocol === 'https:' ? 'secure; samesite=none' : 'samesite=lax';
        
        // Store access_token for Next.js middleware using document.cookie
        document.cookie = `access_token=${response.access}; path=/; max-age=86400; ${isSecure}`;
        
        // Push into the dashboard
        window.location.href = '/forge-gate/dashboard';
      } else {
        setError("Invalid architecture: Missing access token in response payload.");
      }
    } catch (err: any) {
      setError(typeof err === 'string' ? err : err?.detail || 'Authentication breach. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian font-sans flex flex-col items-center justify-center p-6 relative">
      {/* Structural background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none opacity-20 bg-[linear-gradient(rgba(26,43,60,1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,43,60,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="w-full max-w-md bg-black border border-blueprint p-8 shadow-brutal relative">
        <div className="absolute top-0 right-0 w-2 h-2 bg-sovereign animate-pulse m-4"></div>
        
        <div className="mb-8 text-center border-b border-blueprint-dark pb-6">
          <h1 className="text-2xl font-mono text-white uppercase tracking-widest mb-2">Institutional Access</h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Restricted Gateway // ESERIA Architecture</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 font-mono text-xs text-red-400">
              [SYSTEM ERROR]: {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-obsidian-light border border-blueprint text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-sovereign transition-colors w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Master Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-obsidian-light border border-blueprint text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-sovereign transition-colors w-full"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-sovereign text-black font-mono text-sm uppercase tracking-widest font-bold py-4 border border-transparent hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
        
        <div className="mt-8 text-center pt-6 border-t border-blueprint-dark">
           <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">Connection Secured</span>
        </div>
      </div>
    </main>
  );
}
