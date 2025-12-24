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

  // Coin sound effect function
  const playCoinSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Coin sound characteristics
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const toggleDay = (dayIndex: number) => {
    playCoinSound(); // Play sound on toggle
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
    <main className="max-w-[1280px] mx-auto px-6 py-4 min-h-screen">
      <Header />

      {/* Input Section - Unified Control Group */}
      <div className="mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-lg shadow-lg shadow-zinc-900/10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider block">Target (Rs.)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-11 bg-black border border-zinc-800 px-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-zinc-700 transition-all duration-200 text-base font-bold flex items-center"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider block">Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full h-11 bg-black border border-zinc-800 px-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-zinc-700 transition-all duration-200 text-base font-bold flex items-center"
              placeholder="0"
            />
          </div>
          <button
            onClick={calculate}
            className="bg-green-500 hover:bg-green-400 hover:scale-[1.02] active:opacity-90 text-black font-black rounded-xl h-11 mt-auto transition-all duration-200 shadow-xl shadow-green-500/20 text-sm uppercase tracking-wide flex items-center justify-center"
          >
            Generate Plan
          </button>
        </div>
      </div>

      {daily > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in slide-in-from-bottom-5 duration-700">

          {/* Left Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Row 1: Daily Amount Card */}
            <div className="bg-green-500 p-5 rounded-2xl text-black shadow-lg shadow-green-500/10 flex flex-col items-center justify-center h-[130px] transition-colors duration-200 hover:bg-green-400">
              <p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-2">Daily Savings Required</p>
              <h2 className="text-4xl font-black tracking-tighter">Rs. {daily.toLocaleString()}</h2>
            </div>

            {/* Row 2: Chart */}
            <div className="flex-1">
              <SavingsChart days={days} amount={amount} />
            </div>

            {/* Row 3: Till Progress */}
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800/50 shadow-lg shadow-zinc-900/10 flex flex-col items-center justify-center h-[150px] hover:bg-zinc-900/60 transition-colors duration-200">
              <h4 className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">Till Progress</h4>
              <div className="relative w-16 h-24 border-2 border-zinc-700 rounded-b-3xl rounded-t-lg overflow-hidden bg-black">
                <div
                  className="absolute bottom-0 w-full bg-green-500 transition-all duration-500 ease-out"
                  style={{ height: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-3 bg-green-400 opacity-50 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-black text-lg mix-blend-difference text-white">
                  {Math.round(progressPercentage || 0)}%
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-400 font-normal">
                {checkedDays.length} / {days} Days
              </p>
            </div>
          </div>

          {/* Middle Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Row 1: Quote */}
            <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/50 shadow-lg shadow-zinc-900/10 flex items-center justify-center h-[130px] hover:bg-zinc-900/50 transition-colors duration-200">
              <p className="text-2xl font-normal text-center opacity-90 px-4 leading-relaxed">
                {(() => {
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
                })()}
              </p>
            </div>

            {/* Row 2: Summary Cards Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-5 flex-1">
              {/* Current Streak */}
              <div className="bg-gradient-to-r from-orange-500/15 to-red-500/15 p-5 rounded-2xl border border-orange-500/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg shadow-zinc-900/10 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-colors duration-200">
                <p className="text-xs font-medium text-orange-400 uppercase tracking-wider mb-2">Current Streak</p>
                <h3 className="text-4xl font-bold text-orange-400 tracking-tight">🔥 {currentStreak}</h3>
                <p className="text-[10px] font-normal text-orange-300/70 mt-2">consecutive days</p>
              </div>

              {/* Total Saved */}
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-200">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Total Saved</p>
                <h3 className="text-4xl font-bold text-green-500 tracking-tight">Rs. {(checkedDays.length * daily).toLocaleString()}</h3>
              </div>

              {/* Remaining */}
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-200">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Remaining</p>
                <h3 className="text-4xl font-bold text-white tracking-tight">Rs. {(parseFloat(amount) - (checkedDays.length * daily)).toLocaleString()}</h3>
              </div>

              {/* Days Left */}
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-200">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Days Left</p>
                <h3 className="text-4xl font-bold text-white tracking-tight">{parseInt(days) - checkedDays.length}</h3>
                <p className="text-[10px] font-normal text-zinc-600 mt-2">days</p>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) - Calendar Anchor */}
          <div className="lg:col-span-4 flex">
            <div className="w-full">
              <MonthlyCalendar
                checkedDays={checkedDays}
                toggleDay={toggleDay}
                currentDay={24}
              />
            </div>
          </div>

        </div>
      )}
    </main>
  );
}