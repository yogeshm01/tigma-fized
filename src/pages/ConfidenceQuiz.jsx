/**
 * Confidence Quiz Page - Knowledge Check
 * Multiple choice questions with gentle feedback AND summary
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, getQuizQuestions } from '../data/mockData';
import QuizQuestion from '../components/course/QuizQuestion';
import ProgressBar from '../components/common/ProgressBar';
import QuizSummary from '../components/course/QuizSummary';

const ConfidenceQuiz = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress, saveQuizResponse, calculateConfidence, addXp } = useApp();

    // Find the course and progress
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Get quiz questions for this course
    const allQuestions = getQuizQuestions(courseId);

    // Filter questions based on completed lessons (cumulative revision)
    // If no specific lesson mapping exists (legacy data), fallback to all questions
    // Also ensure we have at least one question to avoid errors
    const questions = allQuestions.filter(q => {
        // If question has lessonId, check if lesson is completed/unlocked
        if (q.lessonId) {
            return q.lessonId <= (progress?.lessonsCompleted || 1);
        }
        return true; // Keep questions without lessonId (fallback)
    });

    // Fallback if filter result is empty (shouldn't happen with correct data, but safe)
    if (questions.length === 0 && allQuestions.length > 0) {
        questions.push(allQuestions[0]);
    }

    // Quiz state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizResults, setQuizResults] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    if (!course || !progress) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    // Handle answer
    const handleAnswer = (questionId, answerIndex) => {
        // Find selected option text
        const selectedOption = currentQuestion.options[answerIndex];
        const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
        const isCorrect = answerIndex === currentQuestion.correctAnswer;

        // Record result
        const result = {
            id: currentQuestion.id,
            question: currentQuestion, // Pass the full object so .question and .explanation work
            userAnswerText: selectedOption,
            correctAnswerText: correctOption,
            isCorrect,
        };

        const newResults = [...quizResults, result];
        setQuizResults(newResults);
        saveQuizResponse(courseId, questionId, answerIndex);

        // Award XP for answering
        addXp(10);

        // Move to next question or complete
        setTimeout(() => {
            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                calculateConfidence(courseId, questions);
                setIsCompleted(true);
            }
        }, 1200);
    };

    // Handle skip
    const handleSkip = () => {
        // Treat skip as wrong or neutral? For summary, let's mark it as skipped/incorrect
        const correctOption = currentQuestion.options[currentQuestion.correctAnswer];

        const result = {
            id: currentQuestion.id,
            question: currentQuestion,
            userAnswerText: 'Skipped',
            correctAnswerText: correctOption,
            isCorrect: false,
        };

        const newResults = [...quizResults, result];
        setQuizResults(newResults);

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateConfidence(courseId, questions);
            setIsCompleted(true);
        }
    };

    // Handle continue after summary
    const handleContinue = () => {
        navigate(`/decision/${courseId}`);
    };

    return (
        <div className="min-h-screen gradient-bg">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header (hide if completed to reduce noise) */}
            {!isCompleted && (
                <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-900/50 border-b border-slate-800/50">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigate(`/memory-refresh/${courseId}`)}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back</span>
                            </button>

                            <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-emerald-400" />
                                <span className="text-white font-medium">Confidence Check</span>
                            </div>

                            <div className="text-sm text-slate-400">
                                {currentQuestionIndex + 1} / {totalQuestions}
                            </div>
                        </div>

                        <ProgressBar
                            progress={((currentQuestionIndex + 1) / totalQuestions) * 100}
                            color="green"
                            height="sm"
                        />
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12 relative">
                <AnimatePresence mode="wait">
                    {!isCompleted && currentQuestion ? (
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <QuizQuestion
                                question={currentQuestion}
                                questionNumber={currentQuestionIndex + 1}
                                totalQuestions={totalQuestions}
                                onAnswer={handleAnswer}
                                onSkip={handleSkip}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass rounded-3xl p-8"
                        >
                            <QuizSummary
                                results={quizResults}
                                onContinue={handleContinue}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ConfidenceQuiz;
