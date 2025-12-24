"use client"
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SavingsChart from '@/components/SavingsChart';
import MonthlyCalendar from '@/components/MonthlyCalendar';

export default function Home() {
  const [amount, setAmount] = useState<any>('');
  const [days, setDays] = useState<any>('');
  const [daily, setDaily] = useState(0);
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('salli-pettiya-data');
    if (savedData) {
      const { amount: savedAmount, days: savedDays, daily: savedDaily, checkedDays: savedCheckedDays } = JSON.parse(savedData);
      setAmount(savedAmount);
      setDays(savedDays);
      setDaily(savedDaily);
      setCheckedDays(savedCheckedDays || []);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (daily > 0) {
      const dataToSave = { amount, days, daily, checkedDays };
      localStorage.setItem('salli-pettiya-data', JSON.stringify(dataToSave));
    }
  }, [amount, days, daily, checkedDays]);

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

  // Calculate current streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < parseInt(days); i++) {
      const dayDate = new Date(2025, 11, 24 + i); // Starting from Dec 24, 2025
      dayDate.setHours(0, 0, 0, 0);

      if (dayDate > today) break; // Don't count future days

      if (checkedDays.includes(i)) {
        streak++;
      } else {
        break; // Streak is broken
      }
    }
    return streak;
  };

  const progressPercentage = (checkedDays.length / parseInt(days)) * 100;
  const currentStreak = calculateStreak();

  return (
    <main className="max-w-7xl mx-auto p-2 pb-3 min-h-screen">
      <Header />

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-zinc-900/30 p-3 rounded-[1.5rem] border border-zinc-800/50 backdrop-blur-lg mb-3">
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">Target (Rs.)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-black border border-zinc-800 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-base font-bold" placeholder="0.00" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">Days</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-black border border-zinc-800 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-base font-bold" placeholder="0" />
        </div>
        <button onClick={calculate} className="bg-green-500 hover:bg-green-400 text-black font-black rounded-xl p-2.5 mt-5 md:mt-5 transition-all shadow-xl shadow-green-500/20 active:scale-95 text-sm">GENERATE PLAN</button>
      </div>

      {daily > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700">

          {/* Left Column: Result & Graph & Till */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="bg-green-500 p-4 rounded-[1.5rem] text-black shadow-2xl shadow-green-500/10 flex flex-col items-center justify-center">
              <p className="text-[11px] font-black opacity-60 uppercase tracking-tighter mb-1">Dawasakata danna ona:</p>
              <h2 className="text-5xl font-black tracking-tighter">Rs. {daily.toLocaleString()}</h2>
            </div>
            <SavingsChart days={days} amount={amount} />

            {/* Visual Till (Piggy Bank) Section */}
            <div className="bg-zinc-900/50 p-2.5 rounded-[1.5rem] border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
              <h4 className="text-xs font-black text-zinc-500 mb-2 uppercase">Till Progress</h4>

              {/* Till Shape */}
              <div className="relative w-20 h-28 border-3 border-zinc-700 rounded-b-3xl rounded-t-lg overflow-hidden bg-black">
                {/* Filling Liquid */}
                <div
                  className="absolute bottom-0 w-full bg-green-500 transition-all duration-1000 ease-in-out"
                  style={{ height: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-3 bg-green-400 opacity-50 animate-pulse"></div>
                </div>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl mix-blend-difference text-white">
                  {Math.round(progressPercentage || 0)}%
                </div>
              </div>

              <p className="mt-2 text-xs text-zinc-400">
                {checkedDays.length} / {days} Days
              </p>
            </div>
          </div>

          {/* Center Column: Quote & Summary Cards */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center items-center">
            {/* Motivational Quote */}
            <div className="text-center max-w-md">
              <p className="text-green-500 text-sm md:text-base font-semibold italic px-2">
                "{(() => {
                  const quotes = [
                    "Every rupee saved is a rupee earned!",
                    "Small steps lead to big achievements!",
                    "Save today, smile tomorrow!",
                    "Consistency is the key to success!",
                    "Dream big, save small, achieve more!",
                    "Your future depends on what you do today!",
                    "A penny saved is a penny earned!",
                    "Financial freedom starts with small savings!",
                    "Build your wealth one day at a time!",
                    "Smart saving leads to smart living!"
                  ];
                  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
                  return quotes[dayOfYear % quotes.length];
                })()}"
              </p>
            </div>

            {/* Summary Cards - Vertical Stack */}
            <div className="space-y-4 w-full max-w-xs mx-auto">
              {/* Current Streak */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 px-5 py-4 rounded-[1.5rem] border border-orange-500/50 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold text-orange-400 uppercase tracking-widest mb-1.5">Current Streak</p>
                <h3 className="text-3xl font-black text-orange-400 tracking-tight">🔥 {currentStreak}</h3>
                <p className="text-[8px] text-orange-300/70 mt-1">consecutive days</p>
              </div>

              {/* Total Saved */}
              <div className="bg-zinc-900/40 px-5 py-4 rounded-[1.5rem] border border-zinc-800 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Total Saved</p>
                <h3 className="text-2xl font-black text-green-500 tracking-tight">Rs. {(checkedDays.length * daily).toLocaleString()}</h3>
              </div>

              {/* Remaining */}
              <div className="bg-zinc-900/40 px-5 py-4 rounded-[1.5rem] border border-zinc-800 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Remaining</p>
                <h3 className="text-2xl font-black text-white tracking-tight">Rs. {(parseFloat(amount) - (checkedDays.length * daily)).toLocaleString()}</h3>
              </div>

              {/* Days Left */}
              <div className="bg-zinc-900/40 px-5 py-4 rounded-[1.5rem] border border-zinc-800 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Days Left</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{parseInt(days) - checkedDays.length}</h3>
                <p className="text-[8px] text-zinc-600 mt-1">days</p>
              </div>
            </div>
          </div>

          {/* Right Column: Monthly Calendar */}
          <div className="lg:col-span-4">
            <MonthlyCalendar
              checkedDays={checkedDays}
              toggleDay={toggleDay}
              currentDay={24}
            />
          </div>

        </div>
      )}
    </main>
  );
}