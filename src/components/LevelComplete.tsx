import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { Button } from './ui/button';

interface LevelCompleteProps {
  level: number;
  score: number;
  stars: number;
  onNextLevel: () => void;
  onRetry: () => void;
}

export const LevelComplete = ({ level, score, stars, onNextLevel, onRetry }: LevelCompleteProps) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-background p-8 rounded-xl text-center space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Trophy className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Level {level} Complete!</h2>
        <p className="text-xl">Score: {score}</p>
        
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <Star
                className={`w-12 h-12 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onRetry}>Retry Level</Button>
          <Button onClick={onNextLevel} className="bg-primary text-black">Next Level</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};