/**
 * XPDisplay Component - Shows user's XP with star animation
 * Displays total XP earned with visual flair
 */

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const XPDisplay = ({ xp = 0 }) => {
    // Format XP with commas for large numbers
    const formattedXP = xp.toLocaleString();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
        >
            {/* Star Icon with animation */}
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="relative"
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Star className="w-8 h-8 text-yellow-100 fill-yellow-100" />
                </div>

                {/* Sparkle effect */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md -z-10"
                />
            </motion.div>

            {/* XP Info */}
            <div>
                <p className="text-slate-400 text-sm">Total XP</p>
                <div className="flex items-baseline gap-1">
                    <motion.span
                        key={xp}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-white"
                    >
                        {formattedXP}
                    </motion.span>
                    <span className="text-lg text-yellow-400">XP</span>
                </div>
            </div>
        </motion.div>
    );
};

export default XPDisplay;
