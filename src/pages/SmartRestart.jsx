/**
 * Smart Restart Page - Welcome Back Screen
 * Triggered after inactivity or via "Quick Refresh" button
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, GOAL_OPTIONS } from '../data/mockData';
import Button from '../components/common/Button';

const SmartRestart = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress } = useApp();

    // Find the course and progress
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    if (!course || !progress) return null;

    // Get goal label
    const goalLabel = GOAL_OPTIONS.find((g) => g.id === progress.goal)?.label || progress.goal;

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute w-2 h-2 bg-violet-400 rounded-full"
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg relative"
            >
                {/* Back button */}
                <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="absolute -top-12 left-0 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to course</span>
                </button>

                {/* Main Card */}
                <div className="glass rounded-3xl p-8 text-center">
                    {/* Animated brain icon */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mx-auto mb-8"
                    >
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 mx-auto">
                            <Brain className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    {/* Welcome message */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-3">
                            Welcome back, {user.name}! 👋
                        </h1>
                        <p className="text-lg text-slate-300 mb-6">
                            You're working on {course.name} to <span className="text-violet-400 font-medium">{goalLabel.toLowerCase()}</span>.
                        </p>
                    </motion.div>

                    {/* Reassuring message */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-800/50 rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-center justify-center gap-2 text-emerald-400 mb-3">
                            <Sparkles className="w-5 h-5" />
                            <span className="font-semibold">No pressure. Just progress.</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Let's quickly refresh your memory on what you've learned.
                            It only takes 5 minutes and helps you retain information better!
                        </p>
                    </motion.div>

                    {/* Time indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-2 text-slate-400 mb-8"
                    >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Estimated time: 5 minutes</span>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            onClick={() => navigate(`/memory-refresh/${courseId}`)}
                            variant="accent"
                            size="xl"
                            fullWidth
                            className="mb-4"
                        >
                            <Brain className="w-5 h-5 mr-2" />
                            Refresh my memory (5 min)
                        </Button>

                        <button
                            onClick={() => navigate(`/lesson/${courseId}`)}
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            Skip and continue to lesson →
                        </button>
                    </motion.div>
                </div>

                {/* Progress reminder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-6"
                >
                    <p className="text-slate-500 text-sm">
                        You've completed {progress.lessonsCompleted} of {course.totalLessons} lessons 🎯
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SmartRestart;
