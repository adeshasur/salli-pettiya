"use client"
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js configure karanna ona (TypeScript nisa meka aniwaren ona)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function SalliPettiya() {
  const [amount, setAmount] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [dailyAmount, setDailyAmount] = useState<number>(0);

  const calculate = () => {
    const total = parseFloat(amount);
    const duration = parseInt(days);
    if (total > 0 && duration > 0) {
      setDailyAmount(Number((total / duration).toFixed(2)));
    }
  };

  const chartData = {
    labels: Array.from({ length: parseInt(days) || 0 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Ekathu wena salli (Rs.)',
        data: Array.from({ length: parseInt(days) || 0 }, (_, i) => (parseFloat(amount) / parseInt(days)) * (i + 1)),
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: '#22c55e',
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center font-sans">
      <div className="max-w-xl w-full space-y-10 mt-10">

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-green-500">
            SALLI<span className="text-white">PETTIYA</span>
          </h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Smart Savings Planner</p>
        </div>

        {/* Input Card */}
        <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Target Amount (Rs.)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 mt-2 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-xl font-semibold"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Duration (Days)</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 mt-2 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-xl font-semibold"
                placeholder="0"
              />
            </div>
            <button
              onClick={calculate}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-green-500/20 text-lg uppercase"
            >
              Generate Plan
            </button>
          </div>
        </div>

        {/* Result & Chart Section */}
        {dailyAmount > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
            <div className="bg-green-500 p-8 rounded-[2rem] text-black shadow-xl shadow-green-500/10">
              <p className="text-xs font-black uppercase opacity-60">Daily Contribution</p>
              <h2 className="text-5xl font-black mt-1">Rs. {dailyAmount.toLocaleString()}</h2>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
              <div className="h-[250px] w-full">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { color: '#52525b' } },
                      y: { grid: { color: '#27272a' }, ticks: { color: '#52525b' } }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}