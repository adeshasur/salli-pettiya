"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import SavingsChart from '@/components/SavingsChart';

export default function Home() {
  const [amount, setAmount] = useState<any>('');
  const [days, setDays] = useState<any>('');
  const [daily, setDaily] = useState(0);
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const calculate = () => {
    if (amount > 0 && days > 0) {
      setDaily(Number((amount / days).toFixed(2)));
      setCheckedDays([]); // Reset checked days when recalculating
    }
  };

  const toggleDay = (dayIndex: number) => {
    if (checkedDays.includes(dayIndex)) {
      setCheckedDays(checkedDays.filter(d => d !== dayIndex));
    } else {
      setCheckedDays([...checkedDays, dayIndex]);
    }
  };

  const progressPercentage = (checkedDays.length / parseInt(days)) * 100;

  return (
    <main className="max-w-7xl mx-auto p-3 pb-4 min-h-screen">
      <Header />

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-900/30 p-4 rounded-[1.5rem] border border-zinc-800/50 backdrop-blur-lg mb-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">Target (Rs.)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-lg font-bold" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">Days</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-lg font-bold" placeholder="0" />
        </div>
        <button onClick={calculate} className="bg-green-500 hover:bg-green-400 text-black font-black rounded-xl p-3 mt-6 md:mt-6 transition-all shadow-xl shadow-green-500/20 active:scale-95">GENERATE PLAN</button>
      </div>

      {daily > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">

          {/* Left Column: Result & Graph */}
          <div className="space-y-3">
            <div className="bg-green-500 p-5 rounded-[1.5rem] text-black shadow-2xl shadow-green-500/10">
              <p className="text-[10px] font-black opacity-60 uppercase tracking-tighter mb-1">Dawasakata danna ona:</p>
              <h2 className="text-4xl font-black tracking-tighter">Rs. {daily.toLocaleString()}</h2>
            </div>
            <SavingsChart days={days} amount={amount} />

            {/* Visual Till (Piggy Bank) Section */}
            <div className="bg-zinc-900/50 p-4 rounded-[1.5rem] border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
              <h4 className="text-[10px] font-black text-zinc-500 mb-3 uppercase">Till Progress</h4>

              {/* Till Shape */}
              <div className="relative w-28 h-36 border-4 border-zinc-700 rounded-b-3xl rounded-t-lg overflow-hidden bg-black">
                {/* Filling Liquid */}
                <div
                  className="absolute bottom-0 w-full bg-green-500 transition-all duration-1000 ease-in-out"
                  style={{ height: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-4 bg-green-400 opacity-50 animate-pulse"></div>
                </div>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center font-black text-2xl mix-blend-difference text-white">
                  {Math.round(progressPercentage || 0)}%
                </div>
              </div>

              <p className="mt-2 text-xs text-zinc-400">
                {checkedDays.length} / {days} Days Completed
              </p>
            </div>
          </div>

          {/* Right Column: Calendar Grid */}
          <div className="bg-zinc-900/40 p-5 rounded-[1.5rem] border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-base font-bold mb-3 text-green-500">Savings Calendar 🗓️</h3>
            <div className="grid grid-cols-7 gap-2 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: days }, (_, i) => (
                <div
                  key={i}
                  onClick={() => toggleDay(i)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg border-2 cursor-pointer
                    transition-all duration-300 font-bold text-sm
                    ${checkedDays.includes(i)
                      ? 'bg-green-500 border-green-400 text-black shadow-lg shadow-green-500/20'
                      : 'bg-black/50 border-zinc-800 text-white hover:border-green-500/50 hover:bg-zinc-800/70'
                    }
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}