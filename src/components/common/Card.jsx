/**
 * Card Component - Glass-morphism card with optional gradient
 * Used for course cards, stats widgets, and content containers
 */

import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    gradient = false,
    hover = true,
    onClick = null,
    delay = 0,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { scale: 1.02, y: -5 } : {}}
            onClick={onClick}
            className={`
        ${gradient ? 'gradient-card' : 'glass'}
        rounded-2xl p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

export default Card;
