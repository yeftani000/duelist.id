'use client';
import React, { useState, useEffect } from 'react';

export default function DuelistApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key !== 'Enter') return;
    setLoading(true);
    try {
      // Do NOT include 'http://localhost:8000'
      const res = await fetch(`/api/search?card=${query}`);
      const json = await res.json();
      setResults(json.data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black italic tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            DUELIST<span className="text-blue-500">.ID</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">Indonesian Card Aggregator</p>
        </div>

        {/* Search Bar (Glass) */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Enter card name..."
              className="relative w-full bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-full text-xl focus:outline-none focus:border-white/30 transition-all"
            />
            {loading && <div className="absolute right-6 top-5 animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>}
          </div>
        </div>

        {/* Results (Liquid Glass Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((card) => (
            <div key={card.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-3xl transition-all group-hover:scale-[1.02] group-hover:bg-white/15 shadow-2xl"></div>
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-white/10 text-white/60 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                      {card.source}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight group-hover:text-blue-200 transition-colors">{card.name}</h2>
                </div>
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase text-white/30 font-bold tracking-widest">Market Price</p>
                    <p className="text-3xl font-black">{card.price}</p>
                  </div>
                  <a href={card.url} target="_blank" className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
