"use client"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function SavingsChart({ days, amount }) {
    const data = {
        labels: Array.from({ length: days || 0 }, (_, i) => `${i + 1}`),
        datasets: [{
            label: 'Progress (Rs.)',
            data: Array.from({ length: days || 0 }, (_, i) => (amount / days) * (i + 1)),
            fill: true,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: '#22c55e',
            tension: 0.4,
            pointRadius: 0,
        }],
    };

    return (
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 h-[280px]">
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
        </div>
    );
}