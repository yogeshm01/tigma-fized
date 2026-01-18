/**
 * ConfidenceMeter.jsx - Visual representation of confidence
 * Gentle semi-circle gauge or soft gradient bar
 */
import { motion } from 'framer-motion';

const ConfidenceMeter = ({ score = 0, size = 'md' }) => {
    // Determine color based on score
    let color = 'from-red-500 to-orange-500';
    let label = 'Needs Focus';

    if (score >= 70) {
        color = 'from-emerald-400 to-teal-500';
        label = 'High Confidence';
    } else if (score >= 40) {
        color = 'from-yellow-400 to-amber-500';
        label = 'Growing';
    }

    const height = size === 'lg' ? 'h-3' : 'h-2';

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-medium">Confidence Level</span>
                <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
                    {score}% ({label})
                </span>
            </div>

            {/* Outline */}
            <div className={`w-full bg-slate-800 rounded-full ${height} overflow-hidden`}>
                {/* Fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                />
            </div>

            <p className="text-[10px] text-slate-500 mt-1 text-right">
                Based on quiz accuracy & consistency
            </p>
        </div>
    );
};

export default ConfidenceMeter;
