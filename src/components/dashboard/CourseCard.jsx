/**
 * CourseCard Component - Displays a course with progress
 * Shows course info, XP available, and progress bar if started
 */

import { motion } from 'framer-motion';
import { Clock, Star, Play, RotateCcw } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

const CourseCard = ({
    course,
    progress = null,
    onStart,
    onResume,
    delay = 0,
}) => {
    const isStarted = progress && progress.lessonsCompleted > 0;
    const progressPercentage = progress
        ? (progress.lessonsCompleted / course.totalLessons) * 100
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass rounded-2xl overflow-hidden cursor-pointer group"
        >
            {/* Gradient Header */}
            <div
                className={`
          h-24 bg-gradient-to-r ${course.color}
          flex items-center justify-center
          relative overflow-hidden
        `}
            >
                {/* Course Icon */}
                <motion.span
                    className="text-5xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {course.icon}
                </motion.span>

                {/* XP Badge */}
                <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    <span className="text-sm font-medium text-white">
                        {course.xpAvailable} XP
                    </span>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Course Info */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                        {course.name}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                        {course.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{course.estimatedTime}</span>
                    </div>
                    <div className="text-sm text-slate-400">
                        {course.totalLessons} lessons
                    </div>
                    <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${course.difficulty === 'Beginner'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }
          `}>
                        {course.difficulty}
                    </span>
                </div>

                {/* Progress (if started) */}
                {isStarted && (
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-400">Progress</span>
                            <span className="text-sm font-medium text-white">
                                {progress.lessonsCompleted} / {course.totalLessons}
                            </span>
                        </div>
                        <ProgressBar
                            progress={progressPercentage}
                            color="purple"
                            height="sm"
                        />
                    </div>
                )}

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isStarted ? onResume(course.id) : onStart(course.id)}
                    className={`
            w-full py-3 rounded-xl font-semibold
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isStarted
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white'
                            : 'bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600'
                        }
          `}
                >
                    {isStarted ? (
                        <>
                            <RotateCcw className="w-4 h-4" />
                            Resume
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            Start Course
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CourseCard;
