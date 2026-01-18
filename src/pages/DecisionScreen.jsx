/**
 * Decision Screen Page - Post-Quiz Recommendations
 * Shows confidence-based recommendations without blocking progress
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/mockData';
import Button from '../components/common/Button';

const DecisionScreen = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user, getCourseProgress, confidenceLevel } = useApp();

    // Find the course and progress
    const course = COURSES.find((c) => c.id === courseId);
    const progress = getCourseProgress(courseId);

    // Redirect if course not found or no progress
    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        } else if (!course || !progress) {
            navigate('/dashboard');
        }
    }, [user.isLoggedIn, course, progress, navigate]);

    if (!course || !progress) return null;

    // Determine content based on confidence level
    const getConfidenceContent = () => {
        switch (confidenceLevel) {
            case 'high':
                return {
                    icon: CheckCircle,
                    iconColor: 'text-emerald-400',
                    bgGradient: 'from-emerald-500 to-teal-500',
                    title: "You're ready to continue! ✨",
                    subtitle: "Great job on the quiz! Your knowledge is solid.",
                    message: "You've shown excellent understanding of the concepts. Let's keep the momentum going!",
                    primaryAction: 'Continue to Lesson',
                    primaryPath: `/lesson/${courseId}`,
                    secondaryAction: null,
                };
            case 'medium':
                return {
                    icon: Sparkles,
                    iconColor: 'text-yellow-400',
                    bgGradient: 'from-yellow-500 to-orange-500',
                    title: "You're doing great! 💪",
                    subtitle: "You've got a good foundation.",
                    message: "You can review one more concept or continue to the lesson - either way, you're making progress!",
                    primaryAction: 'Continue to Lesson',
                    primaryPath: `/lesson/${courseId}`,
                    secondaryAction: 'Review One More Concept',
                    secondaryPath: `/memory-refresh/${courseId}`,
                };
            case 'low':
            default:
                return {
                    icon: BookOpen,
                    iconColor: 'text-violet-400',
                    bgGradient: 'from-violet-500 to-purple-500',
                    title: 'Great effort! 🌟',
                    subtitle: "Learning takes time, and you're on the right track.",
                    message: "Would you like a quick review before continuing? No pressure - do what feels right for you.",
                    primaryAction: 'Review Concepts',
                    primaryPath: `/memory-refresh/${courseId}`,
                    secondaryAction: 'Continue Anyway',
                    secondaryPath: `/lesson/${courseId}`,
                };
        }
    };

    const content = getConfidenceContent();
    const IconComponent = content.icon;

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg relative"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl p-8 text-center"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                        className="mx-auto mb-8"
                    >
                        <div className={`
              w-24 h-24 rounded-3xl bg-gradient-to-br ${content.bgGradient}
              flex items-center justify-center shadow-2xl mx-auto
            `}>
                            <IconComponent className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {content.title}
                        </h1>
                        <p className="text-lg text-slate-300 mb-4">
                            {content.subtitle}
                        </p>
                        <p className="text-slate-400 mb-8">
                            {content.message}
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <Button
                            onClick={() => navigate(content.primaryPath)}
                            variant={confidenceLevel === 'high' ? 'success' : confidenceLevel === 'medium' ? 'primary' : 'accent'}
                            size="lg"
                            fullWidth
                        >
                            {content.primaryAction}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>

                        {content.secondaryAction && (
                            <Button
                                onClick={() => navigate(content.secondaryPath)}
                                variant="secondary"
                                size="lg"
                                fullWidth
                                icon={confidenceLevel === 'low' ? <ArrowRight className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                            >
                                {content.secondaryAction}
                            </Button>
                        )}
                    </motion.div>

                    {/* Encouragement */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-sm text-slate-500 mt-8"
                    >
                        Remember: Every step forward is progress! 🚀
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DecisionScreen;
