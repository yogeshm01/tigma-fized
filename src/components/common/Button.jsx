/**
 * Button Component - Animated CTA button with multiple variants
 * Used throughout the app for primary actions
 */

import { motion } from 'framer-motion';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    icon = null,
    className = '',
}) => {
    // Variant styles
    const variants = {
        primary: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25',
        secondary: 'bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600',
        accent: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-orange-500/25',
        success: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25',
        ghost: 'bg-transparent hover:bg-white/5 text-white',
    };

    // Size styles
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        rounded-xl font-semibold
        flex items-center justify-center gap-2
        transition-all duration-300
        ${className}
      `}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </motion.button>
    );
};

export default Button;
