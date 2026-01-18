/**
 * Leaderboard Component - Weekly ranking display
 * Shows top learners with XP and streak information
 */

import { motion } from 'framer-motion';
import { Trophy, Flame, Star } from 'lucide-react';

const Leaderboard = ({ data = [], currentUser = null }) => {
    // Get top 5 for display
    const topLearners = data.slice(0, 5);

    // Find current user's position if they're in the list
    const userPosition = currentUser
        ? data.findIndex(d => d.name === currentUser) + 1
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-5"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-white font-bold">Weekly Leaderboard</h3>
                    <p className="text-sm text-slate-400">Top learners this week</p>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-3">
                {topLearners.map((learner, index) => (
                    <motion.div
                        key={learner.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
              flex items-center gap-3 p-3 rounded-xl
              ${index === 0
                                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30'
                                : index === 1
                                    ? 'bg-gradient-to-r from-slate-400/20 to-slate-500/10 border border-slate-400/30'
                                    : index === 2
                                        ? 'bg-gradient-to-r from-orange-700/20 to-orange-800/10 border border-orange-700/30'
                                        : 'bg-slate-700/30'
                            }
            `}
                    >
                        {/* Rank */}
                        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold
              ${index === 0
                                ? 'bg-yellow-500 text-yellow-900'
                                : index === 1
                                    ? 'bg-slate-400 text-slate-900'
                                    : index === 2
                                        ? 'bg-orange-700 text-orange-100'
                                        : 'bg-slate-600 text-slate-300'
                            }
            `}>
                            {index + 1}
                        </div>

                        {/* Avatar */}
                        <div className="text-2xl">{learner.avatar}</div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{learner.name}</p>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-3 h-3 fill-yellow-400" />
                                    {learner.xp.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1 text-orange-400">
                                    <Flame className="w-3 h-3" />
                                    {learner.streak}
                                </span>
                            </div>
                        </div>

                        {/* Trophy for top 3 */}
                        {index < 3 && (
                            <div className={`
                text-lg
                ${index === 0 ? 'text-yellow-400' : ''}
                ${index === 1 ? 'text-slate-400' : ''}
                ${index === 2 ? 'text-orange-600' : ''}
              `}>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* User Position (if not in top 5) */}
            {userPosition && userPosition > 5 && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/20 border border-violet-500/30">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-white">
                            {userPosition}
                        </div>
                        <p className="text-white font-medium">You</p>
                        <span className="ml-auto text-sm text-violet-300">
                            Keep learning to climb! 🚀
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Leaderboard;
