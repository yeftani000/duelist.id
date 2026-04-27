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
          <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl">
            <input 
              className="flex-1 bg-transparent p-4 text-xl outline-none placeholder:text-white/20"
              placeholder="Card name (e.g. Ash Blossom)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doSearch()}
            />
            <button 
              onClick={doSearch}
              disabled={loading}
              className="bg-white text-black h-14 w-14 md:w-32 rounded-xl flex items-center justify-center font-bold hover:scale-[0.98] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
              ) : (
                <>
                  <Search size={20} className="md:mr-2" />
                  <span className="hidden md:inline">SEARCH</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((card, i) => (
            <div 
              key={i} 
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                  {card.source}
                </span>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold mb-8 leading-tight line-clamp-2 min-h-[3.5rem]">
                {card.name}
              </h3>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Market Price</p>
                  <p className="text-2xl font-black tracking-tight">{card.price}</p>
                </div>
                <a 
                  href={card.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-black p-4 rounded-2xl hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-20 opacity-40 italic">
            No cards found. Try a different card name.
          </div>
        )}
      </div>
    </main>
  );
}
