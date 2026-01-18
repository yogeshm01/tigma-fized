/**
 * ProgressBar Component - Animated progress indicator
 * Used for course progress, lesson progress, and loading states
 */

import { motion } from 'framer-motion';

const ProgressBar = ({
    progress = 0,
    max = 100,
    height = 'md',
    color = 'purple',
    showLabel = false,
    label = '',
    animated = true,
}) => {
    const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);

    // Height variants
    const heights = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
    };

    // Color variants
    const colors = {
        purple: 'from-violet-500 to-purple-600',
        blue: 'from-blue-500 to-cyan-500',
        green: 'from-emerald-500 to-teal-500',
        orange: 'from-orange-500 to-pink-500',
        rainbow: 'from-violet-500 via-pink-500 to-orange-500',
    };

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm font-medium text-white">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div
                className={`
          w-full ${heights[height]}
          bg-slate-700/50 rounded-full
          overflow-hidden
        `}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: animated ? 0.8 : 0, ease: 'easeOut' }}
                    className={`
            h-full rounded-full
            bg-gradient-to-r ${colors[color]}
          `}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
