/**
 * AppContext - Global State Management for Smart Restart
 * Manages user data, course progress, XP, streaks, badges, and quiz responses
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { BADGES, COURSES } from '../data/mockData';
import { getBestNextAction } from '../utils/recommendations';

// Create the context
const AppContext = createContext(null);

// Custom hook to use the app context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

// Provider component
export const AppProvider = ({ children }) => {
    // ============================================
    // USER STATE
    // ============================================
    const [user, setUser] = useState({
        name: '',
        email: '',
        isLoggedIn: false,
    });

    // ============================================
    // GAMIFICATION STATE
    // ============================================
    const [xp, setXp] = useState(0);
    const [streak, setStreak] = useState(0);
    const [lastActiveDate, setLastActiveDate] = useState(null);
    const [earnedBadges, setEarnedBadges] = useState([]);

    // ============================================
    // COURSE STATE
    // ============================================
    const [courseProgress, setCourseProgress] = useState({});
    // Structure: { courseId: { lessonsCompleted: 0, currentLesson: 1, xpEarned: 0, streak: 0, goal: '', timeCommitment: '', motivation: '' } }

    const [currentCourse, setCurrentCourse] = useState(null);

    // ============================================
    // QUIZ STATE
    // ============================================
    const [quizResponses, setQuizResponses] = useState({});
    const [confidenceLevel, setConfidenceLevel] = useState('high'); // 'high', 'medium', 'low'

    // ============================================
    // UI STATE
    // ============================================
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebrationMessage, setCelebrationMessage] = useState('');
    const [newBadge, setNewBadge] = useState(null);

    // ============================================
    // EFFECTS
    // ============================================

    // Check and update streak on load
    useEffect(() => {
        if (lastActiveDate) {
            const today = new Date().toDateString();
            const lastActive = new Date(lastActiveDate).toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();

            if (lastActive !== today && lastActive !== yesterday) {
                // Streak broken
                setStreak(0);
            }
        }
    }, [lastActiveDate]);

    // Check for new badges when XP, streak, or lessons change
    useEffect(() => {
        checkForNewBadges();
    }, [xp, streak, courseProgress]);

    // ============================================
    // USER ACTIONS
    // ============================================

    const login = (name, email) => {
        setUser({ name, email, isLoggedIn: true });
        // Start with a small streak to show the feature
        setStreak(1);
        setLastActiveDate(new Date().toISOString());
    };

    const logout = () => {
        setUser({ name: '', email: '', isLoggedIn: false });
        setXp(0);
        setStreak(0);
        setCourseProgress({});
        setCurrentCourse(null);
        setQuizResponses({});
        setEarnedBadges([]);
    };

    // ============================================
    // COURSE ACTIONS
    // ============================================

    const startCourse = (courseId, goal, timeCommitment, motivation = '') => {
        setCourseProgress(prev => ({
            ...prev,
            [courseId]: {
                lessonsCompleted: 0,
                currentLesson: 1,
                xpEarned: 0,
                streak: 0,
                goal,
                timeCommitment,
                motivation,
                startedAt: new Date().toISOString(),
            },
        }));
        setCurrentCourse(courseId);
    };

    const getCourseProgress = (courseId) => {
        return courseProgress[courseId] || null;
    };

    const resumeCourse = (courseId) => {
        setCurrentCourse(courseId);
    };

    // ============================================
    // LESSON ACTIONS
    // ============================================

    const completeLesson = (courseId) => {
        const xpGained = 50;

        setCourseProgress(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                lessonsCompleted: (prev[courseId]?.lessonsCompleted || 0) + 1,
                currentLesson: (prev[courseId]?.currentLesson || 1) + 1,
                xpEarned: (prev[courseId]?.xpEarned || 0) + xpGained,
                streak: (prev[courseId]?.streak || 0) + 1,
            },
        }));

        addXp(xpGained);
        updateStreak();

        // Trigger celebration
        triggerCelebration(`🎉 Lesson Complete! +${xpGained} XP`);
    };

    // ============================================
    // XP ACTIONS
    // ============================================

    const addXp = (amount) => {
        setXp(prev => prev + amount);
    };

    const awardRecapXp = (amount) => {
        addXp(amount);
    };

    // ============================================
    // STREAK ACTIONS
    // ============================================

    const updateStreak = () => {
        const today = new Date().toDateString();
        const lastActive = lastActiveDate ? new Date(lastActiveDate).toDateString() : null;

        if (lastActive !== today) {
            setStreak(prev => prev + 1);
            setLastActiveDate(new Date().toISOString());
        }
    };

    // ============================================
    // QUIZ ACTIONS
    // ============================================

    const saveQuizResponse = (courseId, questionId, answer) => {
        setQuizResponses(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                [questionId]: answer,
            },
        }));
    };

    const updateCourseStatus = (courseId, status) => {
        setCourseProgress(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                status: status, // 'do_now', 'schedule', 'simplify', 'drop'
            },
        }));
    };

    const updateConfidence = (courseId, score) => {
        setCourseProgress(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                confidenceScore: score,
            },
        }));
    };

    const submitQuizAnswer = (courseId, questionId, answer, questions) => {
        // 1. Determine the new response object explicitly for calculation
        // We use the current state + the new answer
        const currentCourseResponses = quizResponses[courseId] || {};
        const newCourseResponses = { ...currentCourseResponses, [questionId]: answer };

        // 2. Update Quiz Responses State
        setQuizResponses(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                [questionId]: answer,
            },
        }));

        // 3. Calculate Confidence using the NEW object immediately
        if (questions) {
            let correct = 0;
            let total = 0;

            Object.entries(newCourseResponses).forEach(([qId, ans]) => {
                const question = questions.find(q => q.id === parseInt(qId));
                if (question) {
                    total++;
                    if (ans === question.correctAnswer) {
                        correct++;
                    }
                }
            });

            const percentage = total > 0 ? (correct / total) * 100 : 0;

            // 4. Update Course Progress with the calculated score
            setCourseProgress(prev => ({
                ...prev,
                [courseId]: {
                    ...prev[courseId],
                    confidenceScore: percentage,
                },
            }));

            // Update local UI state
            if (percentage >= 70) {
                setConfidenceLevel('high');
            } else if (percentage >= 40) {
                setConfidenceLevel('medium');
            } else {
                setConfidenceLevel('low');
            }

            return { correct, total, percentage };
        }
    };

    // Keep calculateConfidence for initialization or re-calc without new answers
    const calculateConfidence = (courseId, questions) => {
        const responses = quizResponses[courseId] || {};
        let correct = 0;
        let total = 0;

        Object.entries(responses).forEach(([qId, answer]) => {
            const question = questions.find(q => q.id === parseInt(qId));
            if (question) {
                total++;
                if (answer === question.correctAnswer) {
                    correct++;
                }
            }
        });

        const percentage = total > 0 ? (correct / total) * 100 : 0;
        updateConfidence(courseId, percentage);

        if (percentage >= 70) setConfidenceLevel('high');
        else if (percentage >= 40) setConfidenceLevel('medium');
        else setConfidenceLevel('low');

        return { correct, total, percentage };
    };

    // ============================================
    // BADGE ACTIONS
    // ============================================

    const checkForNewBadges = () => {
        const totalLessons = Object.values(courseProgress).reduce(
            (sum, course) => sum + (course.lessonsCompleted || 0),
            0
        );

        BADGES.forEach(badge => {
            if (earnedBadges.includes(badge.id)) return;

            let earned = false;

            if (badge.type === 'lessons' && totalLessons >= badge.requirement) {
                earned = true;
            } else if (badge.type === 'streak' && streak >= badge.requirement) {
                earned = true;
            } else if (badge.type === 'xp' && xp >= badge.requirement) {
                earned = true;
            }

            if (earned) {
                setEarnedBadges(prev => [...prev, badge.id]);
                setNewBadge(badge);
                triggerCelebration(`🏆 New Badge: ${badge.name}!`);
            }
        });
    };

    const dismissBadge = () => {
        setNewBadge(null);
    };

    // ============================================
    // CELEBRATION ACTIONS
    // ============================================

    const triggerCelebration = (message) => {
        setCelebrationMessage(message);
        setShowCelebration(true);
        setTimeout(() => {
            setShowCelebration(false);
            setCelebrationMessage('');
        }, 3000);
    };

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    const getWeeklyProgress = () => {
        // Mock weekly progress data
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const today = new Date().getDay();

        return days.map((day, index) => ({
            day,
            completed: index < today, // Mark past days as completed for demo
            isToday: index === (today === 0 ? 6 : today - 1),
        }));
    };

    const getTotalLessonsCompleted = () => {
        return Object.values(courseProgress).reduce(
            (sum, course) => sum + (course.lessonsCompleted || 0),
            0
        );
    };

    // ============================================
    // CONTEXT VALUE
    // ============================================

    const value = {
        // User
        user,
        login,
        logout,

        // Gamification
        xp,
        streak,
        earnedBadges,
        addXp,
        awardRecapXp,
        updateStreak,

        // Courses
        courseProgress,
        currentCourse,
        startCourse,
        getCourseProgress,
        resumeCourse,
        setCurrentCourse,
        updateCourseStatus,

        // Lessons
        completeLesson,
        getTotalLessonsCompleted,

        // Quiz
        quizResponses,
        confidenceLevel,
        saveQuizResponse,
        calculateConfidence,

        // Badges
        newBadge,
        dismissBadge,
        checkForNewBadges,

        // UI State
        showCelebration,
        celebrationMessage,
        triggerCelebration,

        // Helpers
        getWeeklyProgress,
        getRecommendation: () => getBestNextAction(user, courseProgress, COURSES),
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
