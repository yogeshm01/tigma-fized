/**
 * LessonList.jsx - Displays a list of all course lessons
 */
import { Play, CheckCircle, Lock, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const LessonList = ({ lessons, completedCount, onStartLesson, currentLessonId }) => {
    return (
        <div className="space-y-3">
            {lessons.map((lesson, index) => {
                const isCompleted = index < completedCount;
                const isCurrent = index === completedCount;
                const isLocked = index > completedCount;

                return (
                    <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
              relative p-4 rounded-xl border transition-all duration-200
              ${isCurrent
                                ? 'bg-gradient-to-r from-violet-600/20 to-blue-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10'
                                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60'
                            }
              ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
                        onClick={() => !isLocked && onStartLesson(lesson.id)}
                    >
                        <div className="flex items-center gap-4">
                            {/* Status Icon */}
                            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center shrink-0
                ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : ''}
                ${isCurrent ? 'bg-white text-violet-600 shadow-glow' : ''}
                ${isLocked ? 'bg-slate-700/50 text-slate-500' : ''}
              `}>
                                {isCompleted ? <CheckCircle className="w-5 h-5" /> :
                                    isCurrent ? <Play className="w-5 h-5 fill-current" /> :
                                        <Lock className="w-4 h-4" />}
                            </div>

                            {/* Lesson Info */}
                            <div className="flex-1">
                                <h3 className={`font-medium ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                                    {lesson.id}. {lesson.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {lesson.duration}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-violet-400 font-medium">Up Next</span>
                                    )}
                                </div>
                            </div>

                            {/* Action Button (only for current/completed) */}
                            {!isLocked && (
                                <button className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${isCurrent
                                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}
                `}>
                                    {isCompleted ? 'Review' : 'Start'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default LessonList;
