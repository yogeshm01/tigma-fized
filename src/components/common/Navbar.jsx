/**
 * Navbar.jsx - Global Navigation Bar
 * Provides persistent navigation and status across the application
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, BookOpen, LogOut, Flame, Star, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Navbar = () => {
    const { user, streak, xp, logout } = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Only show navbar if logged in
    if (!user.isLoggedIn) return null;

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/my-plan', label: 'My Plan', icon: Map },
        { path: '/insights', label: 'Insights', icon: Flame },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Brand */}
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                            Smart<span className="text-violet-400">Restart</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                                    ${isActive(item.path)
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon size={18} />
                                <span className="font-medium">{item.label}</span>
                                {isActive(item.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Stats & User */}
                    <div className="flex items-center gap-4">
                        {/* Stats (Visible on all screens) */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500' : 'text-slate-600'}`} />
                                <span className={`text-sm font-bold ${streak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
                                    {streak}
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                                <Star className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-bold text-amber-100">
                                    {xp}
                                </span>
                            </div>
                        </div>

                        {/* User / Mobile Menu Button */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleLogout}
                                className="hidden md:flex p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Sign Out"
                            >
                                <LogOut size={20} />
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-slate-400 hover:text-white"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden border-t border-white/5 bg-slate-900"
                >
                    <div className="px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    ${isActive(item.path)
                                        ? 'bg-violet-500/20 text-violet-300'
                                        : 'text-slate-400 active:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 text-left"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
