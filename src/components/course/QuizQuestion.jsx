/**
 * QuizQuestion Component - Multiple choice question with feedback
 * Shows gentle feedback and no negative scoring
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

const QuizQuestion = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    onSkip,
    showSkip = true,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSelect = (index) => {
        if (showFeedback) return; // Prevent changing answer after feedback

        setSelectedAnswer(index);
        setIsCorrect(index === question.correctAnswer);
        setShowFeedback(true);

        // Report answer and move to next after delay
        setTimeout(() => {
            onAnswer(question.id, index);
        }, 1500);
    };

    const feedbackMessages = {
        correct: ['Great job! 🎉', 'You nailed it! ⭐', 'Excellent! 🚀', 'Perfect! 💪'],
        incorrect: ['Good try! 💪', 'Almost there! 🌟', 'Keep learning! 📚', "You're doing great! 💫"],
    };

    const getRandomFeedback = (type) => {
        const messages = feedbackMessages[type];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
        >
            {/* Question Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                    <span>Question {questionNumber} of {totalQuestions}</span>
                    {showSkip && !showFeedback && (
                        <button
                            onClick={onSkip}
                            className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            Skip this question
                        </button>
                    )}
                </div>
                <h2 className="text-xl font-bold text-white">{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={showFeedback}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        className={`
              w-full p-4 rounded-xl text-left
              flex items-center gap-4
              transition-all duration-300
              ${showFeedback && index === question.correctAnswer
                                ? 'bg-emerald-500/20 border-2 border-emerald-500 ring-2 ring-emerald-500/30'
                                : showFeedback && selectedAnswer === index && !isCorrect
                                    ? 'bg-orange-500/20 border-2 border-orange-500'
                                    : selectedAnswer === index
                                        ? 'bg-violet-500/30 border-2 border-violet-500'
                                        : 'glass border-2 border-transparent hover:border-violet-500/50'
                            }
            `}
                    >
                        {/* Option Letter */}
                        <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold
              ${showFeedback && index === question.correctAnswer
                                ? 'bg-emerald-500 text-white'
                                : showFeedback && selectedAnswer === index && !isCorrect
                                    ? 'bg-orange-500 text-white'
                                    : selectedAnswer === index
                                        ? 'bg-violet-500 text-white'
                                        : 'bg-slate-700 text-slate-300'
                            }
            `}>
                            {showFeedback && index === question.correctAnswer ? (
                                <Check className="w-5 h-5" />
                            ) : showFeedback && selectedAnswer === index && !isCorrect ? (
                                <X className="w-5 h-5" />
                            ) : (
                                String.fromCharCode(65 + index)
                            )}
                        </div>

                        {/* Option Text */}
                        <span className="text-white flex-1">{option}</span>
                    </motion.button>
                ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`
              p-4 rounded-xl text-center
              ${isCorrect
                                ? 'bg-emerald-500/20 border border-emerald-500/50'
                                : 'bg-violet-500/20 border border-violet-500/50'
                            }
            `}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles className={`w-5 h-5 ${isCorrect ? 'text-emerald-400' : 'text-violet-400'}`} />
                            <span className={`font-bold text-lg ${isCorrect ? 'text-emerald-400' : 'text-violet-400'}`}>
                                {getRandomFeedback(isCorrect ? 'correct' : 'incorrect')}
                            </span>
                        </div>
                        {!isCorrect && (
                            <p className="text-sm text-slate-300">{question.explanation}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QuizQuestion;
