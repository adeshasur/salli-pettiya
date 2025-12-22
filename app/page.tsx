"use client"
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function SalliPettiya() {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');
  const [dailyAmount, setDailyAmount] = useState(0);

  const calculate = () => {
    if (amount > 0 && days > 0) {
      setDailyAmount((amount / days).toFixed(2));
    }
  };

  // Chart එකට අවශ්‍ය දත්ත
  const chartData = {
    labels: Array.from({ length: days || 0 }, (_, i) => `Dawas ${i + 1}`),
    datasets: [
      {
        label: 'ඉලක්කයට යන ගමන (Rs.)',
        data: Array.from({ length: days || 0 }, (_, i) => (amount / days) * (i + 1)),
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        tension: 0.4,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-green-500 mb-2">Salli-Pettiya</h1>
          <p className="text-gray-400">ඔයාගේ ඉතිරි කිරීමේ සිහිනයට සැලසුමක්!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <label className="block text-sm font-medium mb-2">මුළු මුදල (Rs.)</label>
            <input
              type="number"
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ex: 30000"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <label className="block text-sm font-medium mb-2">දින ගණන</label>
            <input
              type="number"
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ex: 30"
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-900/20"
        >
          සැලසුම සාදන්න
        </button>

        {dailyAmount > 0 && (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center">
              <p className="text-green-400 text-sm uppercase tracking-wider font-bold">දිනකට ඉතිරි කළ යුතු මුදල</p>
              <h2 className="text-5xl font-black text-white mt-2">Rs. {dailyAmount}</h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}