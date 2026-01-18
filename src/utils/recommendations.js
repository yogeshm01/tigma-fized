/**
 * Recommendation Engine for Smart Restart
 * Analyzes user state to suggest the single best next action
 */

import { differenceInDays, parseISO } from 'date-fns';

export const RECOMMENDATION_TYPES = {
    QUICK_WIN: 'quick_win',       // For broken streaks / low motivation
    CHALLENGE: 'challenge',       // For high confidence / good streak
    CONFIDENCE: 'confidence',     // For low confidence
    FIRST_STEP: 'first_step',     // For new courses
    MAINTENANCE: 'maintenance'    // For completed courses
};

/**
 * Determines the best next action for the user
 * @param {Object} user - User profile and stats
 * @param {Object} courseProgress - Progress for all courses
 * @param {Array} courses - List of all available courses
 * @returns {Object} Recommendation object { type, courseId, title, reason, actionLabel, route }
 */
export const getBestNextAction = (user, courseProgress, courses) => {
    // 1. Check for active course (most recently accessed)
    const activeCourseId = Object.keys(courseProgress).sort((a, b) => {
        return new Date(courseProgress[b].lastAccessed || 0) - new Date(courseProgress[a].lastAccessed || 0);
    })[0];

    // If no active course, suggest the first available one (or "First Step")
    if (!activeCourseId) {
        const firstCourse = courses[0];
        return {
            type: RECOMMENDATION_TYPES.FIRST_STEP,
            courseId: firstCourse.id,
            title: `Start ${firstCourse.name}`,
            reason: "Begin your learning journey today!",
            actionLabel: "Start Course",
            route: `/course/${firstCourse.id}`
        };
    }

    const progress = courseProgress[activeCourseId];
    const course = courses.find(c => c.id === activeCourseId);

    if (!course || !progress) return null;

    // 2. Check Latency / Streak
    const lastActive = progress.lastAccessed ? parseISO(progress.lastAccessed) : new Date();
    const daysSinceActive = differenceInDays(new Date(), lastActive);

    // If away for > 2 days, suggest specific "Quick Win" to rebuild habit
    if (daysSinceActive > 2) {
        return {
            type: RECOMMENDATION_TYPES.QUICK_WIN,
            courseId: activeCourseId,
            title: "Quick Memory Refresh",
            reason: "It's been a few days. Let's warm up your brain without pressure.",
            actionLabel: "Do a 5-min Refresh",
            route: `/memory-refresh/${activeCourseId}`
        };
    }

    // 3. Check Confidence (if implemented, default to 100 if missing)
    const confidence = progress.confidenceScore || 100;

    // If confidence is low (< 60), suggest review or easy quiz
    if (confidence < 60) {
        return {
            type: RECOMMENDATION_TYPES.CONFIDENCE,
            courseId: activeCourseId,
            title: "Boost Your Confidence",
            reason: "You found the last topic a bit tricky. Let's solidify it.",
            actionLabel: "Review & Quiz",
            route: `/smart-restart/${activeCourseId}` // Redirect to restart/review flow
        };
    }

    // 4. Default: Challenge / Continue
    // Calculate next lesson
    const nextLessonNum = (progress.lessonsCompleted || 0) + 1;

    if (nextLessonNum > course.totalLessons) {
        return {
            type: RECOMMENDATION_TYPES.MAINTENANCE,
            courseId: activeCourseId,
            title: "Course Complete!",
            reason: "You've mastered this! Keep your skills sharp.",
            actionLabel: "Practice Quiz",
            route: `/quiz/${activeCourseId}`
        };
    }

    return {
        type: RECOMMENDATION_TYPES.CHALLENGE,
        courseId: activeCourseId,
        title: `Continue: Lesson ${nextLessonNum}`,
        reason: "You're on a roll! Ready for the next concept?",
        actionLabel: "Start Lesson",
        route: `/lesson/${activeCourseId}`
    };
};
