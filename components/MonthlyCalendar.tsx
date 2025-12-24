"use client"
import React from 'react';

interface MonthlyCalendarProps {
    checkedDays: number[];
    toggleDay: (dayIndex: number) => void;
    currentDay: number;
}

export default function MonthlyCalendar({ checkedDays, toggleDay, currentDay }: MonthlyCalendarProps) {
    // December 2025 calendar data
    const year = 2025;
    const month = 11; // December (0-indexed)
    const daysInMonth = 31;

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();

    // Day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create array with empty cells for days before month starts
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    return (
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm shadow-lg shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-2 text-green-500">Savings Calendar</h3>
            <p className="text-sm font-medium text-zinc-400 mb-4">December 2025</p>

            {/* Day Names Header */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
                {dayNames.map((dayName) => (
                    <div
                        key={dayName}
                        className="text-center text-xs font-bold text-green-500/60 uppercase tracking-wider py-1"
                    >
                        {dayName}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        // Empty cell for days before month starts
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayIndex = day - 1; // 0-indexed for checkedDays array
                    const isChecked = checkedDays.includes(dayIndex);
                    const isToday = day === currentDay;
                    const isPast = day < currentDay;
                    const isFuture = day > currentDay;

                    return (
                        <div
                            key={day}
                            onClick={() => toggleDay(dayIndex)}
                            className={`
                aspect-square flex items-center justify-center rounded-lg border cursor-pointer
                transition-all duration-150 font-bold text-sm relative
                ${isChecked
                                    ? 'bg-green-500 border-green-400 text-black shadow-md shadow-green-500/20 hover:scale-105'
                                    : isPast
                                        ? 'bg-black/30 border-zinc-800/50 text-zinc-600 hover:border-green-500/30 hover:scale-105'
                                        : 'bg-black/50 border-zinc-800 text-white hover:border-green-500/50 hover:bg-zinc-800/70 hover:scale-105'
                                }
                ${isToday ? 'ring-2 ring-green-500/50 ring-offset-2 ring-offset-zinc-900' : ''}
              `}
                        >
                            {day}
                            {isToday && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-green-500 bg-green-500" />
                    <span className="text-zinc-400 font-medium">Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-green-500 bg-black relative">
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-zinc-400 font-medium">Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-zinc-800 bg-black" />
                    <span className="text-zinc-400 font-medium">Upcoming</span>
                </div>
            </div>
        </div>
    );
}
