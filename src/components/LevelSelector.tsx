import { useState, useEffect } from 'react';
import { Star, Lock, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LevelProps {
  level: number;
  stars: number;
  isLocked: boolean;
  onSelect: (level: number) => void;
  cityTheme: string;
}

const getCityTheme = (level: number) => {
  const cityIndex = Math.floor((level - 1) / 12);
  const cities = ['Cape Town', 'Johannesburg'];
  return cities[cityIndex] || cities[cities.length - 1];
};

const LevelButton = ({ level, stars, isLocked, onSelect, cityTheme }: LevelProps) => {
  const bgColor = cityTheme === 'Cape Town' ? 'bg-[#9b87f5]' : 'bg-[#7E69AB]';
  
  return (
    <Button
      onClick={() => !isLocked && onSelect(level)}
      className={`w-24 h-24 relative ${isLocked ? 'bg-gray-400' : bgColor}`}
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

interface LevelSelectorProps {
  onLevelSelect: (level: number) => void;
  currentLevel?: number;
  levelStars?: Record<number, number>;
  onBackToMenu: () => void;
}

export const LevelSelector = ({ 
  onLevelSelect,
  currentLevel = 1,
  levelStars = {},
  onBackToMenu
}: LevelSelectorProps) => {
  const [unlockedLevels, setUnlockedLevels] = useState(currentLevel);
  const [currentPage, setCurrentPage] = useState(1);
  const levelsPerPage = 12;
  const startLevel = (currentPage - 1) * levelsPerPage + 1;
  const cityTheme = getCityTheme(startLevel);

  useEffect(() => {
    setUnlockedLevels(currentLevel);
  }, [currentLevel]);

  const backgroundStyle = {
    backgroundImage: cityTheme === 'Cape Town' 
      ? 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625)'
      : 'url(https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <Button 
          onClick={onBackToMenu}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Button>
        <h2 className="text-3xl font-bold">{cityTheme}</h2>
      </div>

      <motion.div 
        className="grid grid-cols-3 gap-4 p-8 rounded-xl"
        style={backgroundStyle}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: levelsPerPage }, (_, i) => {
          const levelNumber = startLevel + i;
          return (
            <LevelButton
              key={levelNumber}
              level={levelNumber}
              stars={levelStars[levelNumber] || 0}
              isLocked={levelNumber > unlockedLevels}
              onSelect={onLevelSelect}
              cityTheme={cityTheme}
            />
          );
        })}
      </motion.div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};