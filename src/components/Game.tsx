import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car } from "@/components/Car";
import { Pothole } from "@/components/Pothole";
import { Score } from "@/components/Score";
import { LevelComplete } from "@/components/LevelComplete";
import { TutorialMessage } from "@/components/TutorialMessage";
import { calculateDifficulty, calculateStars } from "@/utils/gameDifficulty";
import { useToast } from "@/hooks/use-toast";
import ReactConfetti from 'react-confetti';

interface GameProps {
  onExit: () => void;
  level: number;
  onLevelComplete: (stars: number, score: number) => void;
}

export const Game = ({ onExit, level, onLevelComplete }: GameProps) => {
  const [score, setScore] = useState(0);
  const [potholes, setPotholes] = useState<{ id: number; x: number; y: number }[]>([]);
  const [gameTime, setGameTime] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const difficulty = calculateDifficulty(level);

  useEffect(() => {
    const initialPotholes = Array.from({ length: difficulty.potholeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
    setPotholes(initialPotholes);
    setGameTime(difficulty.timeLimit);
  }, [level]);

  useEffect(() => {
    if (gameTime > 0 && !isComplete) {
      const timer = setInterval(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameTime === 0 && !isComplete) {
      handleLevelEnd();
    }
  }, [gameTime, isComplete]);

  const handlePotholeClick = (id: number) => {
    setPotholes(current => {
      const newPotholes = current.filter(p => p.id !== id);
      if (newPotholes.length === 0) {
        handleLevelEnd();
      }
      return newPotholes;
    });
    
    setScore(s => s + 100);
    toast({
      title: "Pothole Fixed!",
      description: "+100 points",
    });
  };

  const handleLevelEnd = () => {
    setIsComplete(true);
    const stars = calculateStars(score, difficulty.potholeCount);
    onLevelComplete(stars, score);
  };

  return (
    <div className="game-container">
      {isComplete && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      <Button 
        onClick={onExit}
        className="absolute top-4 right-4 z-10"
      >
        Exit Game
      </Button>
      
      <Score score={score} />
      
      <div className="absolute top-4 left-32 bg-primary text-black px-4 py-2 rounded-lg">
        Time: {gameTime}s
      </div>

      <TutorialMessage level={level} />
      
      <Car emoji="🚗" lane={1} speed={difficulty.carSpeed} direction="right" />
      <Car emoji="🚙" lane={2} speed={difficulty.carSpeed} direction="left" />
      <Car emoji="🚐" lane={3} speed={difficulty.carSpeed} direction="right" />

      {potholes.map(pothole => (
        <Pothole
          key={pothole.id}
          x={pothole.x}
          y={pothole.y}
          onClick={() => handlePotholeClick(pothole.id)}
        />
      ))}

      {isComplete && (
        <LevelComplete
          level={level}
          score={score}
          stars={calculateStars(score, difficulty.potholeCount)}
          onNextLevel={() => onLevelComplete(calculateStars(score, difficulty.potholeCount), score)}
          onRetry={() => window.location.reload()}
        />
      )}
    </div>
  );
};