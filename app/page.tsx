'use client';
import React, { useState } from 'react';
import { Search, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/search?card=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json.data || []);
    } catch (e) {
      console.error("Search failed:", e);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 md:p-12 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Indo YGO Aggregator</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4">
            DUELIST<span className="text-blue-500">.ID</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Scan multiple marketplaces for the best card deals in Indonesia.
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2
