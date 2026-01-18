/**
 * Landing Page - Welcome & Signup Screen
 * Friendly welcome with name/email form to start the learning journey
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Trophy, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';

const Landing = () => {
    const navigate = useNavigate();
    const { login } = useApp();

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        setIsSubmitting(true);

        // Simulate a brief loading state for better UX
        setTimeout(() => {
            login(name.trim(), email.trim());
            navigate('/dashboard');
        }, 500);
    };

    // Feature cards data
    const features = [
        {
            icon: BookOpen,
            title: 'Learn at Your Pace',
            description: 'Bite-sized lessons that fit into your busy schedule',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            icon: Trophy,
            title: 'Earn Achievements',
            description: 'Unlock badges and climb the leaderboard',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: Zap,
            title: 'Stay Motivated',
            description: 'Build streaks and track your progress daily',
            color: 'from-violet-500 to-purple-500',
        },
    ];

    return (
        <div className="min-h-screen gradient-bg flex flex-col">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-12 relative">
                {/* Left side - Hero content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl text-center lg:text-left"
                >
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 justify-center lg:justify-start mb-8"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Rocket className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Smart Restart</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Your journey to{' '}
                        <span className="gradient-text">mastery</span>{' '}
                        starts here
                    </h1>

                    <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
                        Learn new skills in just minutes a day. No pressure, just progress.
                        Join thousands of learners building better habits.
                    </p>

                    {/* Feature cards - Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 lg:hidden">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="glass rounded-xl p-4"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                                    <feature.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                                <p className="text-xs text-slate-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right side - Signup form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="glass rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-5xl mb-4"
                            >
                                👋
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Welcome, future learner!
                            </h2>
                            <p className="text-slate-400">
                                Let's start your learning adventure today
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    What should we call you?
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Your email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                size="lg"
                                disabled={isSubmitting}
                                className="mt-6"
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        Start my learning journey
                                        <ArrowRight className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Trust indicators */}
                        <div className="mt-8 pt-6 border-t border-slate-700/50">
                            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                                <div className="flex items-center gap-1">
                                    <span className="text-emerald-400">✓</span>
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-emerald-400">✓</span>
                                    <span>No credit card</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Feature cards - Desktop */}
            <div className="hidden lg:block pb-12 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass rounded-2xl p-6"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
