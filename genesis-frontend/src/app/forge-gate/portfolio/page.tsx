"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';

export default function PortfolioLedger() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data: any = await apiClient.get('/portfolio/');
        setAssets(data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this architectural asset?")) return;
    try {
      await apiClient.delete(`/portfolio/${id}/`);
      setAssets(assets.filter(a => a.id !== id));
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert("System Architecture Failure: Could not delete asset.");
    }
  };

  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      <div className="mb-8 border-b border-blueprint-dark pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-tight mb-2">Portfolio Ledger</h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Master record of all Sovereign AI architectural case studies</p>
        </div>
        <Link 
          href="/forge-gate/dashboard"
          className="bg-blueprint text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-blueprint-dark transition-colors"
        >
          Initialize New Asset
        </Link>
      </div>

      <div className="border border-blueprint-dark bg-black/50 backdrop-blur-sm overflow-hidden">
        <table className="w-full text-left font-mono text-sm">
          <thead className="bg-blueprint-dark text-gray-300 text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4 border-b border-blueprint-dark">Title</th>
              <th className="p-4 border-b border-blueprint-dark">Anchor Type</th>
              <th className="p-4 border-b border-blueprint-dark">Status</th>
              <th className="p-4 border-b border-blueprint-dark">Date</th>
              <th className="p-4 border-b border-blueprint-dark text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blueprint-dark text-gray-400">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sovereign animate-pulse">
                  Querying Sovereign Database...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center">
                  No architectural assets found in the ledger.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-blueprint-dark/30 transition-colors">
                  <td className="p-4 text-white font-serif tracking-wide">{asset.title}</td>
                  <td className="p-4">{asset.anchor_type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest border ${asset.is_published ? 'border-sovereign text-sovereign' : 'border-gray-600 text-gray-500'}`}>
                      {asset.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-xs">{new Date(asset.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/forge-gate/portfolio/${asset.id}`}
                        className="text-sovereign hover:text-white transition-colors uppercase tracking-widest text-xs border border-transparent hover:border-sovereign px-3 py-1"
                      >
                        [ Edit ]
                      </Link>
                      <button 
                        onClick={() => handleDelete(asset.id)}
                        className="text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-xs border border-transparent hover:border-red-500 px-3 py-1"
                      >
                        [ Delete ]
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
