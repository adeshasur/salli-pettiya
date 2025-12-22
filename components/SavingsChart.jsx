"use client"
import { Line } from 'react-chartjs-2';
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

export default function SavingsChart({ days, amount }) {
    const data = {
        labels: Array.from({ length: days || 0 }, (_, i) => `${i + 1}`),
        datasets: [{
            label: 'Savings Progress',
            data: Array.from({ length: days || 0 }, (_, i) => (amount / days) * (i + 1)),
            fill: true,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: '#22c55e',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { display: false },
            y: { display: false }
        }
    };

    return (
        <div className="bg-zinc-900/40 p-4 rounded-[1.5rem] border border-zinc-800 h-[160px] backdrop-blur-sm">
            <Line data={data} options={options} />
        </div>
    );
}