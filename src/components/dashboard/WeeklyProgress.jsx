/**
 * WeeklyProgress Component - Visual weekly progress snapshot
 * Shows each day of the week with completion status
 */

import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

const WeeklyProgress = ({ weeklyData = [] }) => {
    // Default weekly data if not provided
    const days = weeklyData.length > 0 ? weeklyData : [
        { day: 'Mon', completed: true, isToday: false },
        { day: 'Tue', completed: true, isToday: false },
        { day: 'Wed', completed: true, isToday: false },
        { day: 'Thu', completed: true, isToday: false },
        { day: 'Fri', completed: false, isToday: true },
        { day: 'Sat', completed: false, isToday: false },
        { day: 'Sun', completed: false, isToday: false },
    ];

    const completedDays = days.filter(d => d.completed).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-5"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-white font-semibold">This Week</h3>
                    <p className="text-sm text-slate-400">
                        {completedDays} of 7 days completed
                    </p>
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                    {Math.round((completedDays / 7) * 100)}%
                </div>
            </div>

            {/* Days */}
            <div className="flex justify-between gap-2">
                {days.map((day, index) => (
                    <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col items-center gap-2"
                    >
                        {/* Day indicator */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${day.completed
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30'
                                    : day.isToday
                                        ? 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/30'
                                        : 'bg-slate-700/50 border border-slate-600'
                                }
              `}
                        >
                            {day.completed ? (
                                <Check className="w-5 h-5 text-white" />
                            ) : day.isToday ? (
                                <Circle className="w-3 h-3 text-white fill-white" />
                            ) : (
                                <Circle className="w-3 h-3 text-slate-500" />
                            )}
                        </motion.div>

                        {/* Day label */}
                        <span className={`
              text-xs font-medium
              ${day.isToday ? 'text-violet-400' : 'text-slate-400'}
            `}>
                            {day.day}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WeeklyProgress;
