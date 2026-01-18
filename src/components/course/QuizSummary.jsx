import React from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizSummary = ({ results, onRetry, onContinue }) => {
    // Calculate score
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalCount = results.length;
    const score = Math.round((correctCount / totalCount) * 100);

    return (
        <div className="space-y-6">
            {/* Score Header */}
            <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-medium">Quiz Results</div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                    {score}%
                </div>
                <p className="text-slate-300">
                    You got <span className="text-white font-bold">{correctCount}</span> out of <span className="text-white font-bold">{totalCount}</span> correct
                </p>
            </div>

            {/* Questions Review */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white px-1">Review Answers</h3>

                {results.map((result, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
              p-4 rounded-xl border
              ${result.isCorrect
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-red-500/10 border-red-500/20'
                            }
            `}
                    >
                        <div className="flex gap-3">
                            <div className={`mt-1 shrink-0 ${result.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                {result.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            </div>

                            <div className="space-y-2 w-full">
                                <p className="font-medium text-slate-200">{result.question.question}</p>

                                <div className="grid gap-2 text-sm mt-3">
                                    {!result.isCorrect && (
                                        <div className="p-2 rounded bg-red-500/20 text-red-200 border border-red-500/30">
                                            <span className="font-bold text-xs uppercase opacity-70 block mb-1">Your Answer</span>
                                            {result.userAnswerText}
                                        </div>
                                    )}

                                    <div className="p-2 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                                        <span className="font-bold text-xs uppercase opacity-70 block mb-1">Correct Answer</span>
                                        {result.correctAnswerText}
                                    </div>
                                </div>

                                {result.question.explanation && (
                                    <div className="mt-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                        <span className="font-bold text-blue-400 mr-2">Why?</span>
                                        {result.question.explanation}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                {score < 100 && (
                    <button
                        onClick={onRetry}
                        className="flex-1 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>
                )}
                <button
                    onClick={onContinue}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all"
                >
                    Continue
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default QuizSummary;
