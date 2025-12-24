"use client"
import React, { useState } from 'react';

interface MonthlyCalendarProps {
    checkedDays: number[];
    toggleDay: (dayIndex: number) => void;
    currentDay: number;
    totalDays?: number;
}

export default function MonthlyCalendar({ checkedDays, toggleDay, currentDay, totalDays = 31 }: MonthlyCalendarProps) {
    // Start date: December 24, 2025
    const startYear = 2025;
    const startMonth = 11; // December (0-indexed)
    const startDay = 24;

    // State for current month offset (0 = first month of savings period)
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

    // Calculate how many months the savings period spans
    const startDate = new Date(startYear, startMonth, startDay);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + totalDays - 1);
    
    // Calculate total months covered
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                        (endDate.getMonth() - startDate.getMonth()) + 1;

    // Calculate displayed month/year
    const displayDate = new Date(startYear, startMonth + currentMonthOffset, 1);
    const displayYear = displayDate.getFullYear();
    const displayMonth = displayDate.getMonth();
    const monthName = displayDate.toLocaleString('default', { month: 'long' });

    // Get days in displayed month
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

    // Get today's actual date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isCurrentMonthDisplayed = today.getMonth() === displayMonth && today.getFullYear() === displayYear;
    const todayDate = today.getDate();

    // Navigation handlers
    const canGoPrevious = currentMonthOffset > 0;
    const canGoNext = currentMonthOffset < totalMonths - 1;

    const handlePrevious = () => {
        if (canGoPrevious) {
            setSlideDirection('right');
            setTimeout(() => {
                setCurrentMonthOffset(currentMonthOffset - 1);
                setSlideDirection(null);
            }, 150);
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            setSlideDirection('left');
            setTimeout(() => {
                setCurrentMonthOffset(currentMonthOffset + 1);
                setSlideDirection(null);
            }, 150);
        }
    };

    // Day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create calendar grid
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Calculate day index in the savings period
    const getDayIndex = (day: number) => {
        const currentDate = new Date(displayYear, displayMonth, day);
        const diffTime = currentDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm shadow-lg shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-2 text-green-500">Savings Calendar</h3>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={handlePrevious}
                    disabled={!canGoPrevious}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                        canGoPrevious 
                            ? 'border-green-500/50 text-green-500 hover:bg-green-500/10 hover:scale-110 cursor-pointer'
                            : 'border-zinc-800/50 text-zinc-700 cursor-not-allowed'
                    }`}
                    aria-label="Previous month"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <p className="text-sm font-medium text-zinc-400">
                    {monthName} {displayYear}
                </p>
                
                <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                        canGoNext 
                            ? 'border-green-500/50 text-green-500 hover:bg-green-500/10 hover:scale-110 cursor-pointer'
                            : 'border-zinc-800/50 text-zinc-700 cursor-not-allowed'
                    }`}
                    aria-label="Next month"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

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

            {/* Calendar Grid with Animation */}
            <div 
                key={currentMonthOffset}
                className={`grid grid-cols-7 gap-1.5 transition-all duration-300 ${
                    slideDirection === 'left' ? 'opacity-0 -translate-x-4' :
                    slideDirection === 'right' ? 'opacity-0 translate-x-4' :
                    'opacity-100 translate-x-0'
                }`}
            >
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayIndex = getDayIndex(day);
                    const isChecked = checkedDays.includes(dayIndex);
                    const isToday = isCurrentMonthDisplayed && day === todayDate;
                    const isInRange = dayIndex >= 0 && dayIndex < totalDays;
                    const isPast = dayIndex < (getDayIndex(currentDay));

                    return (
                        <div
                            key={day}
                            onClick={() => isInRange && toggleDay(dayIndex)}
                            className={`
                                aspect-square flex items-center justify-center rounded-lg border cursor-pointer
                                transition-all duration-150 font-bold text-sm relative
                                ${!isInRange 
                                    ? 'bg-black/10 border-zinc-800/30 text-zinc-800 cursor-not-allowed opacity-30'
                                    : isChecked
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
