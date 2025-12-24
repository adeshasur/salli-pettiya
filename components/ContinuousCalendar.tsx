"use client"
import React from 'react';

interface ContinuousCalendarProps {
    days: number;
    checkedDays: number[];
    toggleDay: (dayIndex: number) => void;
    startDate: Date;
}

export default function ContinuousCalendar({ days, checkedDays, toggleDay, startDate }: ContinuousCalendarProps) {
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    const getDayName = (date: Date) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[date.getDay()];
    };

    return (
        <div className="bg-zinc-900/40 p-4 rounded-[1.5rem] border border-zinc-800 backdrop-blur-sm max-w-2xl ml-auto">
            <h3 className="text-xl font-bold mb-2 text-green-500">Savings Calendar</h3>
            <p className="text-sm text-zinc-400 mb-3">Daily Checklist</p>

            {/* Scrollable Calendar List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {dates.map((date, index) => {
                    const isChecked = checkedDays.includes(index);
                    const dateOnly = new Date(date);
                    dateOnly.setHours(0, 0, 0, 0);
                    const isToday = dateOnly.getTime() === today.getTime();
                    const isPast = dateOnly < today;
                    const isFuture = dateOnly > today;

                    return (
                        <div
                            key={index}
                            onClick={() => toggleDay(index)}
                            className={`
                flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer
                transition-all duration-300 relative
                ${isChecked
                                    ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/10'
                                    : isPast
                                        ? 'bg-black/30 border-zinc-800/50 hover:border-green-500/30'
                                        : 'bg-black/50 border-zinc-800 hover:border-green-500/50 hover:bg-zinc-800/70'
                                }
                ${isToday ? 'ring-2 ring-green-500/50' : ''}
              `}
                        >
                            {/* Left Side: Date Info */}
                            <div className="flex items-center gap-3">
                                {/* Checkbox */}
                                <div className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                  ${isChecked ? 'bg-green-500 border-green-500' : 'border-zinc-600'}
                `}>
                                    {isChecked && (
                                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>

                                {/* Date Display */}
                                <div>
                                    <p className="text-sm font-bold text-white">{formatDate(date)}</p>
                                    <p className="text-[10px] text-zinc-500">{getDayName(date)}</p>
                                </div>
                            </div>

                            {/* Right Side: Day Number & Today Badge */}
                            <div className="flex items-center gap-2">
                                {isToday && (
                                    <span className="text-[9px] font-bold text-green-500 bg-green-500/20 px-2 py-0.5 rounded-full">
                                        TODAY
                                    </span>
                                )}
                                <span className="text-lg font-black text-zinc-600">#{index + 1}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
        </div>
    );
}
