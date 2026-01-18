/**
 * Goal Setup Page - Course Start / Goal Configuration
 * Contextual goal setting when starting a new course
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Target, Clock, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES, GOAL_OPTIONS, TIME_OPTIONS } from '../data/mockData';
import Button from '../components/common/Button';

const GoalSetup = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { startCourse, user } = useApp();

    // Find the course
    const course = COURSES.find((c) => c.id === courseId);

    // Form state
    const [step, setStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [motivation, setMotivation] = useState('');

    // Redirect if course not found or user not logged in
    if (!course || !user.isLoggedIn) {
        navigate('/dashboard');
        return null;
    }

    // Handle goal selection
    const handleGoalSelect = (goalId) => {
        setSelectedGoal(goalId);
    };

    // Handle time selection
    const handleTimeSelect = (timeId) => {
        setSelectedTime(timeId);
    };

    // Handle next step
    const handleNext = () => {
        if (step === 1 && selectedGoal) {
            setStep(2);
        } else if (step === 2 && selectedTime) {
            setStep(3);
        }
    };

    // Handle back
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/dashboard');
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        startCourse(courseId, selectedGoal, selectedTime, motivation);
        navigate(`/course/${courseId}`);
    };

    // Skip motivation step
    const handleSkip = () => {
        startCourse(courseId, selectedGoal, selectedTime, '');
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative"
            >
                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`
                h-2 rounded-full transition-all duration-300
                ${s === step ? 'w-12 bg-violet-500' : 'w-2 bg-slate-600'}
                ${s < step ? 'bg-emerald-500' : ''}
              `}
                        />
                    ))}
                </div>

                {/* Course info header */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl mb-4"
                    >
                        {course.icon}
                    </motion.div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {course.name}
                    </h1>
                    <p className="text-slate-400">
                        Let's personalize your learning experience
                    </p>
                </div>

                {/* Step content */}
                <div className="glass rounded-3xl p-8">
                    {/* Step 1: Goal Selection */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                    <Target className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        What's your main goal?
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        This helps us tailor your experience
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {GOAL_OPTIONS.map((goal) => (
                                    <motion.button
                                        key={goal.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleGoalSelect(goal.id)}
                                        className={`
                      p-5 rounded-xl text-left transition-all duration-300
                      ${selectedGoal === goal.id
                                                ? 'bg-violet-500/30 border-2 border-violet-500 ring-2 ring-violet-500/30'
                                                : 'glass border-2 border-transparent hover:border-violet-500/50'
                                            }
                    `}
                                    >
                                        <span className="text-3xl mb-3 block">{goal.icon}</span>
                                        <h3 className="font-semibold text-white mb-1">{goal.label}</h3>
                                        <p className="text-sm text-slate-400">{goal.description}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Time Commitment */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        How much time can you commit daily?
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        Start small - you can always do more!
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {TIME_OPTIONS.map((time) => (
                                    <motion.button
                                        key={time.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleTimeSelect(time.id)}
                                        className={`
                      w-full p-5 rounded-xl text-left flex items-center gap-4
                      transition-all duration-300
                      ${selectedTime === time.id
                                                ? 'bg-cyan-500/30 border-2 border-cyan-500 ring-2 ring-cyan-500/30'
                                                : 'glass border-2 border-transparent hover:border-cyan-500/50'
                                            }
                    `}
                                    >
                                        <span className="text-3xl">{time.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-white">{time.label}</h3>
                                            <p className="text-sm text-slate-400">{time.description}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Motivation (Optional) */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-pink-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Why does this matter to you?
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        Optional - we'll remind you when things get tough
                                    </p>
                                </div>
                            </div>

                            <textarea
                                value={motivation}
                                onChange={(e) => setMotivation(e.target.value)}
                                placeholder="e.g., I want to switch careers and land my dream job..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all outline-none resize-none mb-8"
                            />

                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={handleSkip}
                                    className="text-slate-400 hover:text-white text-sm transition-colors"
                                >
                                    Skip this step
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleBack}
                            variant="ghost"
                            icon={<ArrowLeft className="w-4 h-4" />}
                        >
                            Back
                        </Button>

                        {step < 3 ? (
                            <Button
                                onClick={handleNext}
                                variant="primary"
                                disabled={(step === 1 && !selectedGoal) || (step === 2 && !selectedTime)}
                            >
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                variant="accent"
                            >
                                Start Learning 🚀
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GoalSetup;
