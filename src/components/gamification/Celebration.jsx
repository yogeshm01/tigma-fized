/**
 * Celebration Component - Confetti and celebration animations
 * Triggered on achievements, lesson completion, etc.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Celebration = ({ show = false, message = '' }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (show) {
            // Generate confetti particles
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                color: [
                    '#7c3aed', // Purple
                    '#06b6d4', // Cyan
                    '#f97316', // Orange
                    '#22c55e', // Green
                    '#f43f5e', // Pink
                    '#fbbf24', // Yellow
                ][Math.floor(Math.random() * 6)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * 360,
            }));
            setParticles(newParticles);
        }
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Confetti Particles */}
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                initial={{
                                    x: particle.x,
                                    y: particle.y,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                animate={{
                                    y: -100,
                                    rotate: particle.rotation + 720,
                                    scale: [1, 1.2, 0],
                                }}
                                transition={{
                                    duration: 2 + Math.random(),
                                    ease: 'easeOut',
                                }}
                                style={{
                                    position: 'absolute',
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                                }}
                            />
                        ))}
                    </div>

                    {/* Message Toast */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl px-8 py-4 shadow-2xl shadow-purple-500/50">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-yellow-300" />
                                <span className="text-white font-bold text-lg">{message}</span>
                                <Sparkles className="w-6 h-6 text-yellow-300" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Celebration;
