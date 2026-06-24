import { motion } from 'framer-motion';
import './LevelComplete.css';

interface LevelCompleteProps {
  title: string;
  onContinue: () => void;
}

export function LevelComplete({ title, onContinue }: LevelCompleteProps) {
  return (
    <motion.div
      className="level-complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="level-complete__icon">✓</div>
      <h2 className="level-complete__title">Level Complete!</h2>
      <p className="level-complete__subtitle">{title}</p>
      <button className="level-complete__btn" onClick={onContinue}>
        Continue →
      </button>
    </motion.div>
  );
}
