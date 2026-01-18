/**
 * LessonQuiz.jsx - Mini Quiz Component
 * Displays a single question after lesson completion to verify understanding
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../data/mockData';

const LessonQuiz = ({ lessonId, courseId, onComplete }) => {
    const { saveQuizResponse, submitQuizAnswer, calculateConfidence } = useApp();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Find a relevant question for this lesson
    const courseQuestions = QUIZ_QUESTIONS[courseId] || [];
    const question = courseQuestions.find(q => q.lessonId === lessonId) || {
        id: 'generic', // Note: Generic questions won't impact confidence score calculation due to ID mismatch
        question: "How confident do you feel about this topic?",
        options: [
            "I could teach this",
            "I understand most of it",
            "I need more practice",
            "I'm completely lost"
        ],
        correctAnswer: 0,
        isGeneric: true
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleContinue = () => {
        // Save the response and recalculate confidence atomically
        if (!question.isGeneric) {
            submitQuizAnswer(courseId, question.id, selectedOption, courseQuestions);
        }

        onComplete(selectedOption === question.correctAnswer);
    };

    const isCorrect = selectedOption === question.correctAnswer;
    const isGeneric = question.isGeneric;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {isGeneric ? "Check In" : "Quick Check"}
                    </h3>
                    <p className="text-slate-400">
                        {isGeneric ? "Let's see how you're feeling." : "Verify your understanding before continuing."}
                    </p>
                </div>

                <div className="space-y-6 mb-8">
                    <h4 className="text-xl font-medium text-white text-center">
                        {question.question}
                    </h4>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            let stateStyles = "border-slate-700 bg-slate-800/50 hover:bg-slate-700/50";

                            if (isSubmitted) {
                                if (index === question.correctAnswer && !isGeneric) {
                                    stateStyles = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                                } else if (index === selectedOption && index !== question.correctAnswer && !isGeneric) {
                                    stateStyles = "border-rose-500 bg-rose-500/10 text-rose-400";
                                } else if (index === selectedOption && isGeneric) {
                                    stateStyles = "border-violet-500 bg-violet-500/10 text-violet-400";
                                } else {
                                    stateStyles = "border-slate-700 opacity-50";
                                }
                            } else if (selectedOption === index) {
                                stateStyles = "border-violet-500 bg-violet-500/20 text-white";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => !isSubmitted && setSelectedOption(index)}
                                    disabled={isSubmitted}
                                    className={`
                                        w-full p-4 rounded-xl border-2 text-left transition-all
                                        ${stateStyles}
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {isSubmitted && index === question.correctAnswer && !isGeneric && (
                                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                                        )}
                                        {isSubmitted && index === selectedOption && index !== question.correctAnswer && !isGeneric && (
                                            <XCircle className="w-5 h-5 text-rose-500" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Explanation Section */}
                        {!isGeneric && (
                            <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
                                <h5 className={`font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isCorrect ? 'Correct!' : 'Not quite right'}
                                </h5>
                                <p className="text-slate-300 text-sm">
                                    {question.explanation || (isCorrect ? "Great job! You've grasped the concept." : "Review the lesson if you need a refresh.")}
                                </p>
                            </div>
                        )}

                        <Button
                            onClick={handleContinue}
                            variant="primary"
                            size="lg"
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            Continue
                        </Button>
                    </motion.div>
                )}

                {!isSubmitted && (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        variant="primary"
                        size="lg"
                        className="w-full"
                    >
                        Submit Answer
                    </Button>
                )}
            </motion.div>
        </div>
    );
};

export default LessonQuiz;
