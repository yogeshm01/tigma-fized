/**
 * Lesson Page - Resume/Learning Screen
 * Displays lesson content with progress tracking and completion celebration
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, getLessonContent } from '../data/mockData';
import Button from '../components/common/Button';
import LessonQuiz from '../components/course/LessonQuiz';

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

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isTimerRunning && !isCompleted && !showQuiz) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, isCompleted, showQuiz]);

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

    return (
        <div className="min-h-screen gradient-bg pt-6 pb-20">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 relative">

                {/* Back Button */}
                <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Course</span>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl overflow-hidden"
                >
                    {/* Lesson Header */}
                    <div className={`bg-gradient-to-r ${course.color} p-8`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-black/20 text-white/90 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                Lesson {progress.currentLesson}
                            </span>
                            <div className="flex items-center gap-2 bg-black/20 text-white/90 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm font-mono">
                                <Clock size={14} />
                                {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{lessonContent.title}</h1>
                        <p className="text-white/80 flex items-center gap-2">
                            ⏱️ {lessonContent.duration} • 50 XP
                        </p>
                    </div>

                    {/* Lesson Content (Text) */}
                    <div className="p-8 md:p-10">
                        <div className="prose prose-invert prose-lg max-w-none">
                            {lessonContent.content.split('\n\n').map((paragraph, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="mb-6"
                                >
                                    {/* Simple markdown-like parsing for headers/code provided in content string */}
                                    {paragraph.startsWith('**') ? (
                                        <h3 className="text-xl font-bold text-white mt-8 mb-4">
                                            {paragraph.replace(/\*\*/g, '')}
                                        </h3>
                                    ) : paragraph.startsWith('```') ? (
                                        <div className="bg-slate-900/80 p-4 rounded-xl font-mono text-sm text-cyan-300 my-4 border border-slate-700 overflow-x-auto">
                                            {paragraph.replace(/```\w*\n?|```/g, '')}
                                        </div>
                                    ) : (
                                        <p className="text-slate-300 leading-relaxed">
                                            {paragraph.replace(/•/g, '• ')}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Completion Section */}
                    <div className="border-t border-slate-700/50 p-8 bg-black/20">
                        {!isCompleted ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex justify-end"
                            >
                                <Button
                                    onClick={handleInitialComplete}
                                    variant="success"
                                    size="lg"
                                    icon={<CheckCircle className="w-5 h-5" />}
                                >
                                    Complete Lesson
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="text-center py-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <p className="text-emerald-400 font-bold flex items-center justify-center gap-2">
                                    <CheckCircle /> Lesson Completed
                                </p>
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
        </div>
    );
};

export default Lesson;
