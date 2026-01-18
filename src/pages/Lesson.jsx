/**
 * Lesson Page - Resume/Learning Screen
 * Displays lesson content with progress tracking and completion celebration
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Star, BookOpen, AlertTriangle, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, getLessonContent } from '../data/mockData';
import Button from '../components/common/Button';
import LessonQuiz from '../components/course/LessonQuiz';
import Modal from '../components/common/Modal';

const Lesson = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress, completeLesson, triggerCelebration } = useApp();

    // Find the course and progress
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Get lesson content
    const lessonContent = getLessonContent(courseId);

    // Timer state
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);

    // Exit Intent State
    const [showExitWarning, setShowExitWarning] = useState(false);
    const [targetMinutes, setTargetMinutes] = useState(10); // Default

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        } else {
            // Parse target time (e.g. "10 min/day" -> 10)
            const target = parseInt(progress.timeCommitment) || 10;
            setTargetMinutes(target);
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isTimerRunning && !isCompleted && !showQuiz && !showExitWarning) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, isCompleted, showQuiz, showExitWarning]);

    if (!course || !progress) return null;

    // Handle initial "Mark as Complete" click
    const handleInitialComplete = () => {
        setIsTimerRunning(false);
        setShowQuiz(true);
    };

    // Handle quiz completion (successful or not)
    const handleQuizComplete = (passed) => {
        setShowQuiz(false);
        setIsCompleted(true);

        completeLesson(courseId);
        triggerCelebration(passed ? '🎉 Lesson & Quiz Complete! +75 XP' : '🎉 Lesson Complete! +50 XP');

        // Navigate after celebration
        setTimeout(() => {
            navigate(`/course/${courseId}`);
        }, 3000);
    };

    // Exit Intent Logic
    const handleExitClick = () => {
        const remainingSeconds = (targetMinutes * 60) - timeElapsed;
        if (remainingSeconds > 0 && !isCompleted) {
            // Pause timer and show warning
            setShowExitWarning(true);
        } else {
            // Met goal or already done, let them leave
            navigate(`/course/${courseId}`);
        }
    };

    const confirmExit = () => {
        navigate(`/course/${courseId}`);
    };

    const cancelExit = () => {
        setShowExitWarning(false);
    };

    const remainingMinutes = Math.max(0, Math.ceil((targetMinutes * 60 - timeElapsed) / 60));

    return (
        <div className="min-h-screen gradient-bg pt-6 pb-20">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 relative space-y-6">

                {/* Header with Exit controls */}
                <header className="flex items-center justify-between">
                    <button
                        onClick={handleExitClick}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Exit Lesson</span>
                    </button>

                    {/* Timer Display */}
                    <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 px-4 py-2 rounded-full font-mono text-sm text-slate-300">
                        <Clock size={16} className="text-violet-400" />
                        {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
                    </div>
                </header>

                {/* Video Player Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50"
                >
                    {/* Video Header */}
                    <div className={`bg-gradient-to-r ${course.color} p-6 pb-20`}>
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-white">
                                {lessonContent.title}
                            </h1>
                        </div>
                    </div>

                    {/* Video Frame (Overlapping header) */}
                    <div className="px-6 md:px-8 -mt-16 pb-8">
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700 relative group">
                            {lessonContent.videoUrl ? (
                                <video
                                    src={lessonContent.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-900">
                                    <p>Video unavailable</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lesson Description/Text (Below Video) */}
                    <div className="px-8 pb-8">
                        <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                            <p className="opacity-80 italic">Watch the video above to complete the lesson.</p>
                            {/* Simply showing the first paragraph or generic text as description since video is primary */}
                            <p>{lessonContent.content.split('\n\n')[1] || lessonContent.content}</p>
                        </div>
                    </div>

                    {/* Completion Section */}
                    <div className="border-t border-slate-700/50 p-6 bg-black/20 flex justify-end">
                        {!isCompleted ? (
                            <Button
                                onClick={handleInitialComplete}
                                variant="success"
                                size="lg"
                                className="w-full sm:w-auto shadow-lg shadow-emerald-500/20"
                                icon={<CheckCircle className="w-5 h-5" />}
                            >
                                I've Watched It - Complete Lesson
                            </Button>
                        ) : (
                            <div className="text-emerald-400 font-bold flex items-center gap-2">
                                <CheckCircle /> Lesson Completed
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>

            {/* Quiz Modal */}
            {showQuiz && (
                <LessonQuiz
                    lessonId={progress.currentLesson}
                    courseId={courseId}
                    onComplete={handleQuizComplete}
                />
            )}

            {/* Exit Warning Modal */}
            <Modal
                isOpen={showExitWarning}
                onClose={() => setShowExitWarning(false)}
                title="Wait! Don't leave yet!"
            >
                <div className="flex flex-col items-center text-center p-2">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 text-amber-500">
                        <Clock size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                        {remainingMinutes} minutes left
                    </h3>

                    <p className="text-slate-400 mb-6">
                        You set a goal of <strong>{timeElapsed < 60 ? '10 min' : progress.timeCommitment}</strong>.
                        You're so close to hitting your daily target!
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <Button
                            onClick={cancelExit}
                            variant="primary"
                            className="w-full justify-center"
                        >
                            Stay & Learn
                        </Button>
                        <button
                            onClick={confirmExit}
                            className="text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors"
                        >
                            I need to leave now
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Lesson;
