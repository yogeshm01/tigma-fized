/**
 * MyPlan.jsx - Guilt-Free Backlog (Learning Matrix)
 * Allows users to categorize courses to manage overwhelm
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Calendar, Zap, XCircle, MoreVertical, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/mockData';

const STATUS_CONFIG = {
    do_now: {
        id: 'do_now',
        label: 'Do Now',
        description: 'Your main focus (Max 2)',
        color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
        icon: Play,
        limit: 2
    },
    schedule: {
        id: 'schedule',
        label: 'Schedule',
        description: 'Save for later',
        color: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
        icon: Calendar,
    },
    simplify: {
        id: 'simplify',
        label: 'Simplify',
        description: 'Just the basics (Recap mode)',
        color: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
        icon: Zap,
    },
    drop: {
        id: 'drop',
        label: 'Drop',
        description: 'Paused for now',
        color: 'bg-slate-700/30 border-slate-600/30 text-slate-400',
        icon: XCircle,
    }
};

const MyPlan = () => {
    const navigate = useNavigate();
    const { courseProgress, updateCourseStatus } = useApp();

    // Group courses by status
    const getCoursesByStatus = (statusId) => {
        return COURSES.filter(course => {
            const progress = courseProgress[course.id];
            if (!progress) return false;

            // Default to 'do_now' if started but no status set
            const currentStatus = progress.status || 'do_now';
            return currentStatus === statusId;
        });
    };

    const handleStatusChange = (courseId, newStatus) => {
        updateCourseStatus(courseId, newStatus);
    };

    return (
        <div className="min-h-screen gradient-bg p-6 pb-24">
            {/* Header */}
            <header className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">My Learning Plan</h1>
                    <p className="text-slate-400">Manage your load. It's okay to prioritize.</p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(STATUS_CONFIG).map((status) => {
                    const courses = getCoursesByStatus(status.id);
                    const StatusIcon = status.icon;

                    return (
                        <div key={status.id} className="flex flex-col h-full">
                            {/* Column Header */}
                            <div className={`p-4 rounded-t-xl border-t border-x ${status.color}`}>
                                <div className="flex items-center gap-2 font-bold text-lg">
                                    <StatusIcon size={20} />
                                    {status.label}
                                </div>
                                <div className="text-xs opacity-70 mt-1">{status.description}</div>
                            </div>

                            {/* Drop Zone / List */}
                            <div className="bg-slate-900/40 border border-slate-700/50 rounded-b-xl p-4 min-h-[200px] flex-1 space-y-3">
                                {courses.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-slate-500 text-sm italic border-2 border-dashed border-slate-800 rounded-lg">
                                        No courses
                                    </div>
                                ) : (
                                    courses.map(course => (
                                        <motion.div
                                            layoutId={course.id}
                                            key={course.id}
                                            className="bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-sm group relative"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{course.icon}</div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-white text-sm truncate">{course.name}</h3>
                                                    <div className="text-xs text-slate-400 mt-0.5">
                                                        {courseProgress[course.id].lessonsCompleted} / {course.totalLessons} lessons
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Move Actions (Simulated Dropdown) */}
                                            <div className="mt-3 pt-3 border-t border-slate-700/50 flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                                                {Object.values(STATUS_CONFIG)
                                                    .filter(s => s.id !== status.id)
                                                    .map(targetStatus => (
                                                        <button
                                                            key={targetStatus.id}
                                                            onClick={() => handleStatusChange(course.id, targetStatus.id)}
                                                            className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[10px] text-slate-300 whitespace-nowrap transition-colors"
                                                            title={`Move to ${targetStatus.label}`}
                                                        >
                                                            To {targetStatus.label}
                                                        </button>
                                                    ))}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyPlan;
