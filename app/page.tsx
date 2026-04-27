'use client';
import React, { useState } from 'react';
import { Search, ShieldCheck, ExternalLink, Activity } from 'lucide-react';

export default function DuelistPage() {
  const [query, setQuery] = useState('');

  return (
    <main className="max-w-6xl mx-auto px-6 pt-20 pb-12">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
          <Activity size={14} />
          <span>Systems Nominal</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          DUELIST<span className="text-blue-500">.ID</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          The ultimate data aggregator for high-stakes digital identities.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="glass-card p-2 mb-12 max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative flex items-center bg-[#0a0a0a] rounded-xl overflow-hidden">
          <div className="pl-4 text-slate-500">
            <Search size={20} />
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search identity or wallet..."
            className="w-full bg-transparent border-none py-4 px-4 text-white focus:ring-0 placeholder:text-slate-600"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg mr-2 transition-all font-medium">
            Analyze
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <ShieldCheck className="text-green-400" />, title: "Trust Score", desc: "Real-time reputation verification." },
          { icon: <Activity className="text-blue-400" />, title: "Activity Feed", desc: "Cross-chain behavioral tracking." },
          { icon: <ExternalLink className="text-purple-400" />, title: "External Links", desc: "Unified social & wallet mapping." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 hover:bg-white/[0.05] transition-colors group">
            <div className="mb-4 p-2 w-fit rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
