/**
 * BadgeUnlock Component - Modal for new badge notifications
 * Shows badge with celebration animation
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import Button from '../common/Button';

const BadgeUnlock = ({ badge, show = false, onDismiss }) => {
    if (!badge) return null;

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onDismiss}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
                    >
                        <div className="glass rounded-3xl p-8 text-center relative overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={onDismiss}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Background Stars */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            x: Math.random() * 100 - 50,
                                            y: Math.random() * 100 - 50,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            delay: i * 0.1,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                    >
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Badge Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', damping: 10 }}
                                className={`
                  w-28 h-28 rounded-full mx-auto mb-6
                  bg-gradient-to-br ${badge.color}
                  flex items-center justify-center
                  shadow-2xl relative
                `}
                            >
                                <span className="text-6xl">{badge.icon}</span>

                                {/* Glow effect */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${badge.color} blur-xl -z-10`}
                                />
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="text-violet-400 text-sm font-medium mb-2">
                                    🎉 Badge Unlocked!
                                </p>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {badge.name}
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    {badge.description}
                                </p>

                                <Button onClick={onDismiss} variant="primary" fullWidth>
                                    Awesome! 🚀
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BadgeUnlock;
