"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import Link from 'next/link';

export default function AssetEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [asset, setAsset] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    anchor_type: '',
    published_content: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    is_published: false,
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const data: any = await apiClient.get(`/portfolio/${id}/`);
        setAsset(data);
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          anchor_type: data.anchor_type ? data.anchor_type.toUpperCase() : 'STANDARD',
          published_content: data.published_content || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          keywords: data.keywords || '',
          is_published: data.is_published || false,
        });
      } catch (error) {
        console.error("Failed to fetch asset:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.patch(`/portfolio/${id}/`, formData);
      router.push('/forge-gate/portfolio');
    } catch (error) {
      console.error("Failed to save asset:", error);
      alert("System Architecture Failure: Could not persist to database.");
    } finally {
      setIsSaving(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('published_content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.published_content;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end, text.length);

    const newText = before + prefix + selected + suffix + after;
    setFormData(prev => ({ ...prev, published_content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const uploadData = new FormData();
    uploadData.append('portfolio_asset', id);
    uploadData.append('file', file);
    uploadData.append('alt_text', file.name);

    try {
      const data: any = await apiClient.post('/media/', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAsset((prev: any) => ({
        ...prev,
        media_gallery: [...(prev?.media_gallery || []), data]
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert('Media Upload Failed');
    }
  };

  if (isLoading) {
    return <div className="p-10 font-mono text-sovereign animate-pulse">Loading architectural schematics...</div>;
  }

  return (
    <div className="p-10 max-w-[1400px] mx-auto pb-32">
      <div className="mb-8 border-b border-blueprint-dark pb-6 flex justify-between items-end">
        <div>
          <Link href="/forge-gate/portfolio" className="text-sovereign font-mono text-xs uppercase tracking-widest hover:underline mb-4 inline-block">← Back to Ledger</Link>
          <h1 className="text-3xl font-serif text-white uppercase tracking-tight mb-2">Architectural Editor</h1>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">{asset?.id}</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-sovereign text-black font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-white transition-colors disabled:opacity-50"
        >
          {isSaving ? "Persisting..." : "Save Architecture"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Column 1: Core Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black/50 border border-blueprint-dark p-6">
            <h2 className="font-serif text-xl text-white mb-6 uppercase border-b border-blueprint-dark pb-2">Primary Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="w-full bg-black border border-blueprint-dark p-3 text-white font-sans focus:border-sovereign focus:outline-none transition-colors" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Slug</label>
                  <input 
                    type="text" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleChange}
                    className="w-full bg-black border border-blueprint-dark p-3 text-white font-mono text-xs focus:border-sovereign focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Anchor Type</label>
                  <select 
                    name="anchor_type" 
                    value={formData.anchor_type} 
                    onChange={handleChange}
                    className="w-full bg-black border border-blueprint-dark p-3 text-white font-mono text-xs focus:border-sovereign focus:outline-none transition-colors appearance-none"
                  >
                    <option value="STANDARD">Standard Case Study</option>
                    <option value="AUDIT">Revenue Leakage Audit</option>
                    <option value="INTELLIGENCE">Data Intelligence Dashboard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Markdown Body</label>
                <div className="flex gap-2 mb-2">
                  <button type="button" onClick={() => insertMarkdown('**', '**')} className="px-3 py-1 bg-blueprint-dark text-white font-mono text-xs hover:bg-sovereign hover:text-black transition-colors border border-blueprint">B</button>
                  <button type="button" onClick={() => insertMarkdown('*', '*')} className="px-3 py-1 bg-blueprint-dark text-white font-mono text-xs hover:bg-sovereign hover:text-black transition-colors border border-blueprint italic">I</button>
                  <button type="button" onClick={() => insertMarkdown('```\n', '\n```')} className="px-3 py-1 bg-blueprint-dark text-white font-mono text-xs hover:bg-sovereign hover:text-black transition-colors border border-blueprint">{`{ }`}</button>
                  <button type="button" onClick={() => insertMarkdown('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '')} className="px-3 py-1 bg-blueprint-dark text-white font-mono text-xs hover:bg-sovereign hover:text-black transition-colors border border-blueprint">[TABLE]</button>
                </div>
                <textarea 
                  id="published_content"
                  name="published_content" 
                  value={formData.published_content} 
                  onChange={handleChange}
                  rows={25}
                  className="w-full bg-[#050505] border border-blueprint-dark p-4 text-gray-300 font-mono text-sm leading-relaxed focus:border-sovereign focus:outline-none transition-colors resize-y" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: SEO & Settings */}
        <div className="space-y-6">
          <div className="bg-black/50 border border-blueprint-dark p-6">
            <h2 className="font-serif text-xl text-white mb-6 uppercase border-b border-blueprint-dark pb-2">SEO Dominance</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Meta Title</label>
                <input 
                  type="text" 
                  name="meta_title" 
                  value={formData.meta_title} 
                  onChange={handleChange}
                  className="w-full bg-black border border-blueprint-dark p-3 text-white font-sans focus:border-sovereign focus:outline-none transition-colors" 
                  placeholder="Max 60 chars"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Meta Description</label>
                <textarea 
                  name="meta_description" 
                  value={formData.meta_description} 
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black border border-blueprint-dark p-3 text-white font-sans focus:border-sovereign focus:outline-none transition-colors" 
                  placeholder="Max 160 chars"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">Keywords</label>
                <input 
                  type="text" 
                  name="keywords" 
                  value={formData.keywords} 
                  onChange={handleChange}
                  className="w-full bg-black border border-blueprint-dark p-3 text-white font-sans focus:border-sovereign focus:outline-none transition-colors" 
                  placeholder="Comma separated"
                />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-blueprint-dark p-6">
            <h2 className="font-serif text-xl text-white mb-6 uppercase border-b border-blueprint-dark pb-2">Visibility Protocol</h2>
            
            <label className="flex items-center gap-4 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-14 h-8 border ${formData.is_published ? 'border-sovereign bg-sovereign/20' : 'border-gray-600 bg-black'} transition-colors`}></div>
                <div className={`absolute left-1 top-1 w-6 h-6 ${formData.is_published ? 'bg-sovereign translate-x-6' : 'bg-gray-600'} transition-transform`}></div>
              </div>
              <span className={`font-mono text-xs uppercase tracking-widest ${formData.is_published ? 'text-sovereign' : 'text-gray-500'}`}>
                {formData.is_published ? 'Published to Grid' : 'Internal Draft'}
              </span>
            </label>
          </div>

          <div className="bg-black/50 border border-blueprint-dark p-6">
            <h2 className="font-serif text-xl text-white mb-6 uppercase border-b border-blueprint-dark pb-2">Media Vault</h2>
            
            <div className="space-y-4">
              <label className="border border-dashed border-gray-600 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sovereign transition-colors bg-obsidian-light">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">[ INJECT MEDIA ]</span>
              </label>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {asset?.media_gallery?.map((media: any) => (
                  <div key={media.id} className="relative group border border-blueprint-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media.file} alt={media.alt_text} className="w-full h-24 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(`![${media.alt_text}](${media.file})`); }}
                      className="absolute inset-0 bg-black/80 text-white font-mono text-[10px] uppercase flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Copy Markdown
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
