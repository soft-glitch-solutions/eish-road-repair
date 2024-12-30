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

interface CityTheme {
  name: string;
  image: string;
  color: string;
}

interface LevelProps {
  level: number;
  stars: number;
  isLocked: boolean;
  onSelect: (level: number) => void;
  cityTheme: CityTheme;
}

const getCityTheme = (level: number): CityTheme => {
  const cityIndex = Math.floor((level - 1) / 12);
  const cities: CityTheme[] = [
    {
      name: 'Cape Town',
      image: '/lovable-uploads/1bb7e077-b56d-44f3-b6f7-649116701e55.png',
      color: 'bg-[#9b87f5]'
    },
    {
      name: 'Johannesburg',
      image: '/lovable-uploads/9ce51d91-7f8b-4184-9c4c-a836dbe0e1b4.png',
      color: 'bg-[#7E69AB]'
    },
    {
      name: 'Durban',
      image: '/lovable-uploads/6bf7f1e0-1afc-437c-b555-104249c9609b.png',
      color: 'bg-[#6B4E71]'
    }
  ];
  return cities[cityIndex] || cities[cities.length - 1];
};

const LevelButton = ({ level, stars, isLocked, onSelect, cityTheme }: LevelProps) => {
  return (
    <Button
      onClick={() => !isLocked && onSelect(level)}
      className={`w-24 h-24 relative ${isLocked ? 'bg-gray-400' : cityTheme.color} transition-all duration-300 hover:scale-105`}
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
        <h2 className="text-3xl font-bold">{cityTheme.name}</h2>
      </div>

      <motion.div 
        className="grid grid-cols-3 gap-4 p-8 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${cityTheme.image})` }}
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
