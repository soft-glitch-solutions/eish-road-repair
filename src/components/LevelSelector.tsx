import { useState } from 'react';
import { Star, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface LevelProps {
  level: number;
  stars: number;
  isLocked: boolean;
  onSelect: (level: number) => void;
}

const LevelButton = ({ level, stars, isLocked, onSelect }: LevelProps) => {
  return (
    <Button
      onClick={() => !isLocked && onSelect(level)}
      className={`w-24 h-24 relative ${isLocked ? 'bg-gray-400' : 'bg-primary'}`}
      disabled={isLocked}
    >
      {isLocked ? (
        <Lock className="w-8 h-8" />
      ) : (
        <>
          <span className="text-xl font-bold">Level {level}</span>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i <= stars ? 'fill-yellow-400' : 'fill-gray-400'}`}
              />
            ))}
          </div>
        </>
      )}
    </Button>
  );
};

export const LevelSelector = ({ onLevelSelect }: { onLevelSelect: (level: number) => void }) => {
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const [levelStars, setLevelStars] = useState<Record<number, number>>({});

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 p-8 bg-secondary/20 rounded-xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <LevelButton
          key={i + 1}
          level={i + 1}
          stars={levelStars[i + 1] || 0}
          isLocked={i + 1 > unlockedLevels}
          onSelect={onLevelSelect}
        />
      ))}
    </motion.div>
  );
};