/**
 * StreakWidget Component - Daily learning streak display
 * Shows fire emoji animation and current streak count
 */

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const StreakWidget = ({ streak = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
        >
            {/* Fire Icon with animation */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
                className="relative"
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Flame className="w-8 h-8 text-yellow-200" />
                </div>

                {/* Glow effect */}
                <motion.div
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-orange-500/30 blur-md -z-10"
                />
            </motion.div>

            {/* Streak Info */}
            <div>
                <p className="text-slate-400 text-sm">Current Streak</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{streak}</span>
                    <span className="text-lg text-slate-400">
                        {streak === 1 ? 'day' : 'days'}
                    </span>
                </div>
                {streak >= 3 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-orange-400 font-medium"
                    >
                        🔥 You're on fire!
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};

export default StreakWidget;
