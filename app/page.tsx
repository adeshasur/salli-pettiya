"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import SavingsChart from '@/components/SavingsChart';

export default function Home() {
  const [amount, setAmount] = useState<any>('');
  const [days, setDays] = useState<any>('');
  const [daily, setDaily] = useState(0);

  const calculate = () => {
    if (amount > 0 && days > 0) {
      setDaily(Number((amount / days).toFixed(2)));
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-10">
      <Header />

      {/* Input Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900/30 p-6 rounded-[2rem] border border-zinc-800 backdrop-blur-md">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-500 ml-2">TARGET (RS.)</label>
          <input type="number" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-green-500 transition-all" placeholder="Ex: 30000" onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-500 ml-2">DAYS</label>
          <input type="number" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-green-500 transition-all" placeholder="Ex: 30" onChange={(e) => setDays(e.target.value)} />
        </div>
        <button onClick={calculate} className="bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl p-4 mt-5 md:mt-4 transition-all uppercase tracking-tighter">Generate Plan</button>
      </div>

      {daily > 0 && (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Side */}
          <div className="space-y-6">
            <div className="bg-green-500 p-8 rounded-[2rem] text-black shadow-xl shadow-green-500/10">
              <p className="text-[10px] font-black opacity-60 uppercase">Dawasakata danna ona gana:</p>
              <h2 className="text-5xl font-black tracking-tighter">Rs. {daily.toLocaleString()}</h2>
            </div>
            <SavingsChart days={days} amount={amount} />
          </div>

          {/* Calendar List */}
          <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800">
            <h3 className="text-lg font-bold mb-6 text-green-500 flex items-center gap-2">Savings Calendar 🗓️</h3>
            <div className="h-[400px] overflow-y-auto pr-3 custom-scrollbar space-y-3">
              {Array.from({ length: days }, (_, i) => (
                <div key={i} className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500">DAY {i + 1}</span>
                    <span className="text-lg font-bold text-white">Rs. {daily}</span>
                  </div>
                  <input type="checkbox" className="w-6 h-6 rounded-lg accent-green-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}