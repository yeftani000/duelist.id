'use client';
import React, { useState } from 'react';
import { Search, ExternalLink, TrendingUp, CreditCard } from 'lucide-react';

export default function DuelistPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-20 pb-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter text-white">
          DUELIST<span className="text-blue-500">.ID</span>
        </h1>
        <p className="text-slate-400 mt-2">Indonesia's Yu-Gi-Oh! Price Aggregator</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-2 mb-12 max-w-2xl mx-auto flex bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter Card Name (e.g. Ash Blossom)..."
          className="w-full bg-transparent border-none py-4 px-4 text-white focus:ring-0"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-lg transition-all"
        >
          {loading ? '...' : <Search size={20} />}
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((card, i) => (
          <div key={i} className="glass-card p-4 border border-white/10 hover:border-blue-500/50 transition-all group">
            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-white/5">
              <img src={card.image} alt={card.card_name} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-blue-400 font-bold">
                {card.store}
              </div>
            </div>
            <h3 className="font-semibold text-lg line-clamp-1">{card.card_name}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-green-400">
                Rp {card.price.toLocaleString('id-ID')}
              </span>
              <a 
                href={card.link} 
                target="_blank" 
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
