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
        labels: Array.from({ length: days || 0 }, (_, i) => `Day ${i + 1}`),
        datasets: [{
            label: 'Savings Progress',
            data: Array.from({ length: days || 0 }, (_, i) => (amount / days) * (i + 1)),
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 160);
                gradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
                gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.2)');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                return gradient;
            },
            borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, context.chart.width, 0);
                gradient.addColorStop(0, '#10b981');
                gradient.addColorStop(0.5, '#22c55e');
                gradient.addColorStop(1, '#4ade80');
                return gradient;
            },
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#22c55e',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 15,
            shadowColor: 'rgba(34, 197, 94, 0.5)',
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        animation: {
            duration: 2500,
            easing: 'easeInOutCubic',
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default') {
                    delay = context.dataIndex * 25;
                }
                return delay;
            },
        },
        animations: {
            tension: {
                duration: 1500,
                easing: 'easeInOutQuad',
                from: 0.2,
                to: 0.4,
                loop: false
            },
            y: {
                duration: 2500,
                easing: 'easeInOutCubic',
                from: (ctx) => {
                    if (ctx.type === 'data') {
                        return ctx.chart.scales.y.getPixelForValue(0);
                    }
                }
            },
            borderWidth: {
                duration: 1000,
                easing: 'linear',
                from: 2,
                to: 3,
                loop: false
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                titleColor: '#22c55e',
                titleFont: {
                    size: 13,
                    weight: 'bold'
                },
                bodyColor: '#fff',
                bodyFont: {
                    size: 14,
                    weight: 'bold'
                },
                padding: 14,
                borderColor: '#22c55e',
                borderWidth: 2,
                cornerRadius: 10,
                displayColors: false,
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => `Rs. ${context.parsed.y.toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: true,
                    color: 'rgba(34, 197, 94, 0.05)',
                    lineWidth: 1,
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            y: {
                display: true,
                grid: {
                    display: true,
                    color: 'rgba(34, 197, 94, 0.05)',
                    lineWidth: 1,
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="relative group">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            {/* Chart container */}
            <div className="relative bg-zinc-900/40 p-4 rounded-[1.5rem] border border-zinc-800/70 h-[160px] backdrop-blur-sm hover:bg-zinc-900/50 transition-all duration-500 hover:border-green-500/40 hover:shadow-2xl hover:shadow-green-500/20 group-hover:scale-[1.01]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}