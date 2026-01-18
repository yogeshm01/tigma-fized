/**
 * MemoryRefresh.jsx - Interactive Micro-Learning
 * Shows expandable recap cards for ALL learned lessons
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, getRecapCards, getCourseLessons } from '../data/mockData';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import RecapCard from '../components/course/RecapCard';

const MemoryRefresh = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress, awardRecapXp, triggerCelebration } = useApp();

    // Find the course and progress
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Get all lessons and manual recap cards
    const allLessons = getCourseLessons(courseId);
    const manualRecapCards = getRecapCards(courseId);

    // Generate dynamic recap cards based on COMPLETED lessons
    const completedLessonCount = Math.max(progress?.lessonsCompleted || 0, 1); // Ensure at least 1 for demo

    const recapCards = allLessons.slice(0, completedLessonCount).map((lesson, index) => {
        // Try to find a manual card for this lesson index
        const manualCard = manualRecapCards.find(c => c.id === index + 1);

        if (manualCard) return manualCard;

        // Fallback generic card
        return {
            id: lesson.id,
            icon: '📘',
            keyword: lesson.title,
            shortExplanation: 'Key concept review',
            fullExplanation: `Review the core concepts covered in "${lesson.title}". Remember to apply these principles in your next coding challenge!`,
            xp: 10
        };
    });

    // Track viewed cards
    const [viewedCards, setViewedCards] = useState(new Set());
    const [totalXpEarned, setTotalXpEarned] = useState(0);

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    if (!course || !progress) return null;

    // Handle card view
    const handleCardView = (cardId, xp) => {
        if (!viewedCards.has(cardId)) {
            setViewedCards(new Set([...viewedCards, cardId]));
            setTotalXpEarned((prev) => prev + xp);
            awardRecapXp(xp);
        }
    };

    // Calculate progress
    const refreshProgress = (viewedCards.size / recapCards.length) * 100;
    const isComplete = viewedCards.size >= recapCards.length;

    // Handle continue
    const handleContinue = () => {
        if (viewedCards.size > 0) {
            triggerCelebration(`🧠 Memory refreshed! +${totalXpEarned} XP`);
        }
        navigate(`/quiz/${courseId}`);
    };

    return (
        <div className="min-h-screen gradient-bg">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-900/50 border-b border-slate-800/50">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(`/course/${courseId}`)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Back to Course</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-violet-400" />
                            <span className="text-white font-medium">Memory Refresh</span>
                        </div>

                        <div className="text-sm text-yellow-400 font-semibold">
                            +{totalXpEarned} XP
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8 relative">
                {/* Progress Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-6 mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-xl font-bold text-white mb-1">
                                Let's refresh your memory! 🧠
                            </h1>
                            <p className="text-sm text-slate-400">
                                Reviewing all {recapCards.length} learned concepts
                            </p>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span className="text-white font-medium">
                                {viewedCards.size} of {recapCards.length} reviewed
                            </span>
                        </div>
                    </div>

                    <ProgressBar
                        progress={refreshProgress}
                        color="purple"
                        height="md"
                    />
                </motion.div>

                {/* Recap Cards */}
                <div className="space-y-4 mb-8">
                    {recapCards.map((card, index) => (
                        <RecapCard
                            key={card.id}
                            card={card}
                            onView={handleCardView}
                            isViewed={viewedCards.has(card.id)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Continue Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="sticky bottom-6"
                >
                    <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            {isComplete ? (
                                <p className="text-emerald-400 font-medium">
                                    ✨ Great job! You're ready for the quiz!
                                </p>
                            ) : (
                                <p className="text-slate-400">
                                    Review concepts to maximize your quiz score
                                </p>
                            )}
                        </div>

                        <Button
                            onClick={handleContinue}
                            variant={isComplete ? 'success' : 'primary'}
                        // Allow continue even if incomplete, but encourage completion
                        >
                            {isComplete ? 'Take Confidence Quiz' : 'Skip to Quiz'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default MemoryRefresh;
