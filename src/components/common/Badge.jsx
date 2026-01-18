/**
 * Badge Component - Achievement badge display
 * Shows earned badges with animations and locked state
 */

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const Badge = ({
    badge,
    earned = false,
    size = 'md',
    showDetails = true,
}) => {
    // Size variants
    const sizes = {
        sm: { icon: 'text-2xl', container: 'w-12 h-12' },
        md: { icon: 'text-4xl', container: 'w-16 h-16' },
        lg: { icon: 'text-5xl', container: 'w-20 h-20' },
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`
        flex flex-col items-center gap-2
        ${earned ? '' : 'opacity-50'}
      `}
        >
            {/* Badge Icon Container */}
            <div
                className={`
          ${sizes[size].container}
          rounded-full flex items-center justify-center
          ${earned
                        ? `bg-gradient-to-br ${badge.color} shadow-lg`
                        : 'bg-slate-700/50 border border-slate-600'
                    }
          relative
        `}
            >
                {earned ? (
                    <span className={sizes[size].icon}>{badge.icon}</span>
                ) : (
                    <Lock className="w-6 h-6 text-slate-500" />
                )}

                {/* Glow effect for earned badges */}
                {earned && (
                    <motion.div
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(124, 58, 237, 0.3)',
                                '0 0 40px rgba(124, 58, 237, 0.5)',
                                '0 0 20px rgba(124, 58, 237, 0.3)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                    />
                )}
            </div>

            {/* Badge Details */}
            {showDetails && (
                <div className="text-center">
                    <p className={`font-semibold ${earned ? 'text-white' : 'text-slate-500'}`}>
                        {badge.name}
                    </p>
                    <p className="text-xs text-slate-400 max-w-24">
                        {badge.description}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default Badge;
