'use client';
import React, { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?card=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl font-black italic text-center mb-12 tracking-tighter">DUELIST<span className="text-blue-500">.ID</span></h1>
        
        <div className="relative mb-12">
          <input 
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl text-xl outline-none focus:border-blue-500/50 transition-all"
            placeholder="Search Card (e.g. Blue-Eyes)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doSearch()}
          />
          {loading && <div className="absolute right-5 top-6 animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((card: any, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-all">
              <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 block">{card.source}</span>
              <h3 className="text-xl font-bold mb-4">{card.name}</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-black">{card.price}</p>
                <a href={card.url} target="_blank" className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:scale-110 transition-transform">VIEW</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
