/**
 * CourseHome.jsx - Progress Overview & Lesson List
 * Shows course progress, lesson curriculum, and navigation options
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RefreshCw, Target, Flame, Star, BookOpen, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, LEADERBOARD, GOAL_OPTIONS, TIME_OPTIONS, getCourseLessons } from '../data/mockData';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import Leaderboard from '../components/course/Leaderboard';
import LessonList from '../components/course/LessonList';
import Modal from '../components/common/Modal';

const CourseHome = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress, xp } = useApp();

    // State for leaderboard modal
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    // Find the course
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Get full lesson list
    const allLessons = getCourseLessons(courseId);

    // Redirect if course not found, no progress, or user not logged in
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course) {
            navigate('/dashboard');
        } else if (!progress) {
            navigate(`/goal-setup/${courseId}`);
        }
    }, [user.isLoggedIn, course, progress, courseId, navigate]);

    if (!course || !progress) return null;

    // Get goal and time labels
    const goalLabel = GOAL_OPTIONS.find((g) => g.id === progress.goal)?.label || progress.goal;
    const timeLabel = TIME_OPTIONS.find((t) => t.id === progress.timeCommitment)?.label || progress.timeCommitment;

    // Calculate progress percentage
    const progressPercentage = (progress.lessonsCompleted / course.totalLessons) * 100;

    // Handle starting a specific lesson
    const handleStartLesson = (lessonId) => {
        // In a real app, we might check if it's locked, but LessonList handles UI state
        // Here we just navigate to the lesson page
        navigate(`/lesson/${courseId}`);
    };

    return (
        <div className="min-h-screen gradient-bg">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-900/50 border-b border-slate-800/50">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Back to Dashboard</span>
                        </button>

                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-yellow-400 font-semibold">{xp} XP</span>
                            <button
                                onClick={() => setShowLeaderboard(true)}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                            >
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                <span className="hidden xs:inline">Leaderboard</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8 relative">
                {/* Course Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl p-8 mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Course Icon & Info */}
                        <div className="flex-1">
                            <div className="flex items-start gap-4 mb-6">
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color}
                    flex items-center justify-center text-3xl shadow-lg
                  `}
                                >
                                    {course.icon}
                                </motion.div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-1">
                                        {course.name}
                                    </h1>
                                    <p className="text-slate-400">{course.description}</p>
                                </div>
                            </div>

                            {/* Goal & Time */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full">
                                    <Target className="w-4 h-4" />
                                    <span className="text-sm font-medium">{goalLabel}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full">
                                    <RefreshCw className="w-4 h-4" />
                                    <span className="text-sm font-medium">{timeLabel}</span>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-400">Course Progress</span>
                                    <span className="text-white font-semibold">
                                        {progress.lessonsCompleted} of {course.totalLessons} lessons
                                    </span>
                                </div>
                                <ProgressBar
                                    progress={progressPercentage}
                                    color="rainbow"
                                    height="lg"
                                />
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                                        <Star className="w-5 h-5 fill-yellow-400" />
                                        <span className="text-xl font-bold">{progress.xpEarned}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">XP Earned</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                                        <Flame className="w-5 h-5" />
                                        <span className="text-xl font-bold">{progress.streak}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Course Streak</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                                        <BookOpen className="w-5 h-5" />
                                        <span className="text-xl font-bold">{progress.lessonsCompleted}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                >
                    <Button
                        onClick={() => navigate(`/lesson/${courseId}`)}
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={<Play className="w-5 h-5" />}
                    >
                        Continue Learning
                    </Button>

                    <Button
                        onClick={() => navigate(`/smart-restart/${courseId}`)}
                        variant="secondary"
                        size="lg"
                        fullWidth
                        icon={<RefreshCw className="w-5 h-5" />}
                    >
                        Quick Refresh (Revise All)
                    </Button>
                </motion.div>

                {/* Lesson List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        Course Curriculum
                    </h2>
                    <LessonList
                        lessons={allLessons}
                        completedCount={progress.lessonsCompleted}
                        onStartLesson={handleStartLesson}
                        currentLessonId={null} // LessonList calculates based on count and index
                    />
                </motion.div>
            </main>

            {/* Leaderboard Modal */}
            <Modal
                isOpen={showLeaderboard}
                onClose={() => setShowLeaderboard(false)}
                title="Weekly Leaderboard"
            >
                <Leaderboard data={LEADERBOARD} currentUser={user.name} />
            </Modal>
        </div>
    );
};

export default CourseHome;
