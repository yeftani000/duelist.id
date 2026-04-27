import React, { useState } from 'react';

const LiquidCard = ({ item }) => (
  <div className="relative group overflow-hidden rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/30 to-transparent">
    {/* Inner Glass Plate */}
    <div className="relative bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 h-full flex flex-col justify-between border border-white/10 transition-all group-hover:bg-white/15">
      
      {/* Source Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-opacity-20 ${
          item.source === 'Tokopedia' ? 'bg-green-500 text-green-300' : 
          item.source === 'Shopee' ? 'bg-orange-500 text-orange-300' : 'bg-blue-500 text-blue-300'
        }`}>
          {item.source}
        </span>
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
      </div>

      {/* Card Info */}
      <div>
        <h3 className="text-white font-semibold text-lg leading-tight mb-2 group-hover:text-yellow-200 transition-colors">
          {item.name}
        </h3>
        <p className="text-white/40 text-xs tracking-wide mb-4">Condition: Near Mint</p>
      </div>

      {/* Price & Action */}
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="text-white/50 text-[10px] uppercase font-bold">Best Listing</p>
          <p className="text-white text-2xl font-black tabular-nums">{item.price}</p>
        </div>
        <button className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all text-white">
          →
        </button>
      </div>
    </div>
  </div>
);

export default function DuelistDemo() {
  const [search, setSearch] = useState("");
  
  // Dummy data representing aggregated results
  const results = [
    { source: "Tokopedia", name: "S:P Little Knight - Secret Rare", price: "Rp 1.450.000" },
    { source: "Shopee", name: "S:P Little Knight - Super Rare", price: "Rp 850.000" },
    { source: "Facebook (YDI)", name: "[WTS] Little Knight OCG JP", price: "Rp 1.200.000" }
  ];

  return (
    <div className="min-h-screen bg-[#02040a] p-8 font-sans relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Search Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tighter italic">DUELIST.ID</h1>
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search card name (e.g. S:P Little Knight)..." 
              className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </header>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((item, i) => <LiquidCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
}
