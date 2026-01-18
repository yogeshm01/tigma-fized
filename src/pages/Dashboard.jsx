/**
 * Dashboard.jsx - Adaptive Learning Hub
 * Focuses on "Best Next Action" rather than a list of choices
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Calendar, Flame, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RECOMMENDATION_TYPES } from '../utils/recommendations';
import ConfidenceMeter from '../components/common/ConfidenceMeter';
import Button from '../components/common/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, streak, getRecommendation, getCourseProgress } = useApp();

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        }
    }, [user.isLoggedIn, navigate]);

    if (!user.isLoggedIn) return null;

    const recommendation = getRecommendation();
    const progress = recommendation && recommendation.courseId ? getCourseProgress(recommendation.courseId) : null;
    const confidenceScore = progress?.confidenceScore || 0;

    // Theme configuration to prevent Tailwind purging
    const THEME_CONFIG = {
        [RECOMMENDATION_TYPES.QUICK_WIN]: {
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-500',
            icon: Brain,
            bgGlow: 'bg-emerald-500/20',
            badgeBg: 'bg-emerald-500/10',
            badgeText: 'text-emerald-300',
            badgeBorder: 'border-emerald-500/20',
            buttonShadow: 'shadow-emerald-500/25',
            visualText: 'text-emerald-400'
        },
        [RECOMMENDATION_TYPES.CONFIDENCE]: {
            color: 'amber',
            gradient: 'from-amber-500 to-orange-500',
            icon: Layers,
            bgGlow: 'bg-amber-500/20',
            badgeBg: 'bg-amber-500/10',
            badgeText: 'text-amber-300',
            badgeBorder: 'border-amber-500/20',
            buttonShadow: 'shadow-amber-500/25',
            visualText: 'text-amber-400'
        },
        [RECOMMENDATION_TYPES.CHALLENGE]: {
            color: 'violet',
            gradient: 'from-violet-600 to-indigo-600',
            icon: Flame,
            bgGlow: 'bg-violet-500/20',
            badgeBg: 'bg-violet-500/10',
            badgeText: 'text-violet-300',
            badgeBorder: 'border-violet-500/20',
            buttonShadow: 'shadow-violet-500/25',
            visualText: 'text-violet-400'
        },
        [RECOMMENDATION_TYPES.FIRST_STEP]: {
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500',
            icon: Sparkles,
            bgGlow: 'bg-blue-500/20',
            badgeBg: 'bg-blue-500/10',
            badgeText: 'text-blue-300',
            badgeBorder: 'border-blue-500/20',
            buttonShadow: 'shadow-blue-500/25',
            visualText: 'text-blue-400'
        },
        [RECOMMENDATION_TYPES.MAINTENANCE]: {
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500',
            icon: Calendar,
            bgGlow: 'bg-purple-500/20',
            badgeBg: 'bg-purple-500/10',
            badgeText: 'text-purple-300',
            badgeBorder: 'border-purple-500/20',
            buttonShadow: 'shadow-purple-500/25',
            visualText: 'text-purple-400'
        }
    };

    // Default fallback
    const theme = recommendation ? (THEME_CONFIG[recommendation.type] || THEME_CONFIG[RECOMMENDATION_TYPES.CHALLENGE]) : THEME_CONFIG[RECOMMENDATION_TYPES.CHALLENGE];
    const RecommendationIcon = theme.icon;

    return (
        <div className="min-h-screen gradient-bg p-6 pb-24">
            {/* Header / Greeting */}
            <header className="max-w-4xl mx-auto mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                        Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user.name.split(' ')[0]}
                    </h1>
                    <p className="text-slate-400">Let's make today count.</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-12">
                {/* 1. Best Next Action (Hero) */}
                {recommendation && (
                    <section>
                        <div className="flex items-center gap-2 mb-4 text-violet-300 font-medium uppercase tracking-wider text-sm">
                            <Sparkles size={16} />
                            Best Next Action
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-700/50 shadow-2xl"
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-96 h-96 ${theme.bgGlow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none`} />

                            <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-white/5 rounded-3xl">
                                {/* Left: Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`
                                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4
                                        ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder}
                                    `}>
                                        {recommendation.title}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                        {recommendation.reason}
                                    </h2>

                                    <div className=" mb-8 max-w-sm mx-auto md:mx-0">
                                        <ConfidenceMeter score={confidenceScore} size="lg" />
                                    </div>

                                    <Button
                                        onClick={() => navigate(recommendation.route)}
                                        size="lg"
                                        className={`bg-gradient-to-r ${theme.gradient} ${theme.buttonShadow} w-full md:w-auto px-8`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <RecommendationIcon size={20} />
                                            {recommendation.actionLabel}
                                            <ArrowRight size={20} />
                                        </div>
                                    </Button>

                                    <p className="mt-4 text-sm text-slate-400">
                                        Takes about {progress?.timeCommitment?.replace('min', '') || '10'} minutes
                                    </p>
                                </div>

                                {/* Right: Visual/Illustration */}
                                <div className="hidden md:flex items-center justify-center w-64 h-64 shrink-0 bg-white/5 rounded-full border border-white/10 relative">
                                    <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                                    <div className={`text-6xl ${theme.visualText}`}>
                                        <RecommendationIcon size={80} strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* 2. Secondary Actions (Manage Plan) */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/my-plan')}
                        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-slate-600 text-left group"
                    >
                        <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Calendar size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">My Learning Plan</h3>
                        <p className="text-sm text-slate-400">Organize your backlog & priorities</p>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/insights')}
                        className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-slate-600 text-left group"
                    >
                        <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Insights & Badges</h3>
                        <p className="text-sm text-slate-400">View progress & achievements</p>
                    </motion.button>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
