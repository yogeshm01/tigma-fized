/**
 * Insights.jsx - Analytics & Achievements Page
 * Visualizes user progress, learning habits, and gamification rewards
 */

import { motion } from 'framer-motion';
import { Flame, Star, Clock, Trophy, Lock, Calendar, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BADGES } from '../data/mockData';

const Insights = () => {
    const { user, xp, streak, earnedBadges, getWeeklyProgress, getTotalLessonsCompleted } = useApp();
    const weeklyProgress = getWeeklyProgress();
    const totalLessons = getTotalLessonsCompleted();

    // Mock total time calculation (approx 15 mins per lesson)
    const totalMinutes = totalLessons * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return (
        <div className="min-h-screen gradient-bg p-6 pb-24">
            <header className="max-w-6xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Insights & Achievements</h1>
                <p className="text-slate-400">Track your growth and celebrate your milestones.</p>
            </header>

            <main className="max-w-6xl mx-auto space-y-8">
                {/* 1. Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Flame}
                        value={streak}
                        label="Day Streak"
                        color="orange"
                        subtext="Keep it burning!"
                    />
                    <MetricCard
                        icon={Star}
                        value={xp}
                        label="Total XP"
                        color="amber"
                        subtext="Level 5 Learner"
                    />
                    <MetricCard
                        icon={Clock}
                        value={timeString}
                        label="Time Spent"
                        color="cyan"
                        subtext="Focused learning"
                    />
                    <MetricCard
                        icon={Target}
                        value={totalLessons}
                        label="Lessons Done"
                        color="emerald"
                        subtext="Steps forward"
                    />
                </div>

                {/* 2. Visualizations Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weekly Activity Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
                                <Calendar size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Weekly Activity</h3>
                        </div>

                        <div className="h-48 flex items-end justify-between gap-4 px-2">
                            {weeklyProgress.map((day, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full relative group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: day.completed ? '80%' : '10%' }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className={`
                                                w-full rounded-t-lg transition-all duration-300
                                                ${day.isToday
                                                    ? 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                                                    : day.completed
                                                        ? 'bg-slate-600 group-hover:bg-slate-500'
                                                        : 'bg-slate-800'
                                                }
                                            `}
                                        />
                                    </div>
                                    <span className={`text-xs font-medium ${day.isToday ? 'text-violet-400' : 'text-slate-500'}`}>
                                        {day.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress Summary Card (Placeholder for now) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                            <Trophy size={40} className="text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Top 5%</h3>
                        <p className="text-indigo-200/80 mb-6 text-sm">You're learning faster than most users this week!</p>
                        <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors">
                            View Leaderboard
                        </button>
                    </motion.div>
                </div>

                {/* 3. Badge Collection */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Trophy className="text-amber-400" size={20} />
                        Badge Collection
                        <span className="text-sm font-normal text-slate-500 ml-2">
                            ({earnedBadges.length} / {BADGES.length} unlocked)
                        </span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {BADGES.map((badge, index) => {
                            const isUnlocked = earnedBadges.includes(badge.id);

                            return (
                                <motion.div
                                    key={badge.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`
                                        relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 border
                                        ${isUnlocked
                                            ? 'bg-slate-800/80 border-slate-700/50'
                                            : 'bg-slate-900/50 border-slate-800 opacity-60'
                                        }
                                    `}
                                >
                                    <div className={`
                                        text-4xl transition-all duration-300
                                        ${isUnlocked ? 'scale-110 drop-shadow-xl' : 'grayscale opacity-30 blur-[1px]'}
                                    `}>
                                        {badge.icon}
                                    </div>

                                    <div className="space-y-1">
                                        <div className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                                            {badge.name}
                                        </div>
                                        {isUnlocked && (
                                            <div className="text-[10px] text-slate-400 leading-tight">
                                                {badge.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* Lock overlay for locked badges */}
                                    {!isUnlocked && (
                                        <div className="absolute top-2 right-2 text-slate-600">
                                            <Lock size={12} />
                                        </div>
                                    )}

                                    {/* Tooltip hint on hover for locked badges could go here */}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

const MetricCard = ({ icon: Icon, value, label, color, subtext }) => {
    const colorStyles = {
        orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-24 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-20 group-hover:opacity-30 ${colorStyles[color].replace('text-', 'bg-').split(' ')[0]}`} />

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorStyles[color]}`}>
                <Icon size={20} />
            </div>

            <div className="text-2xl font-bold text-white mb-0.5 font-mono">{value}</div>
            <div className="text-sm font-medium text-slate-400 mb-1">{label}</div>
            <div className="text-xs text-slate-500">{subtext}</div>
        </motion.div>
    );
};

export default Insights;
