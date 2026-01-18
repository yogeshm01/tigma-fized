/**
 * RecapCard Component - Expandable knowledge recap card
 * Used in memory refresh flow with XP awards
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Check } from 'lucide-react';

const RecapCard = ({
    card,
    onView,
    isViewed = false,
    index = 0,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        if (!isExpanded && !isViewed) {
            // Award XP when viewing for the first time
            onView(card.id, card.xp);
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
        glass rounded-2xl overflow-hidden
        transition-all duration-300
        ${isViewed ? 'ring-2 ring-emerald-500/50' : ''}
      `}
        >
            {/* Card Header - Always visible */}
            <motion.button
                onClick={handleExpand}
                className="w-full p-5 flex items-center gap-4 text-left"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
                {/* Icon */}
                <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${isViewed
                        ? 'bg-emerald-500/20'
                        : 'bg-violet-500/20'
                    }
        `}>
                    {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white">{card.keyword}</h3>
                        {isViewed && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full"
                            >
                                <Check className="w-3 h-3" />
                                Reviewed
                            </motion.span>
                        )}
                    </div>
                    <p className="text-sm text-slate-400">{card.shortExplanation}</p>
                </div>

                {/* XP Badge and Expand Icon */}
                <div className="flex items-center gap-3">
                    {!isViewed && (
                        <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            +{card.xp}
                        </div>
                    )}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                </div>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-0">
                            <div className="p-4 bg-slate-800/50 rounded-xl">
                                <p className="text-slate-300 leading-relaxed">
                                    {card.fullExplanation}
                                </p>
                            </div>

                            {/* XP Earned notification */}
                            {!isViewed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 flex items-center justify-center gap-2 text-yellow-400"
                                >
                                    <Star className="w-5 h-5 fill-yellow-400" />
                                    <span className="font-medium">+{card.xp} XP earned!</span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default RecapCard;
