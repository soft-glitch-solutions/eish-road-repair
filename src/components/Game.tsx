import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car } from "@/components/Car";
import { Pothole } from "@/components/Pothole";
import { Score } from "@/components/Score";
import { LevelComplete } from "@/components/LevelComplete";
import { useToast } from "@/hooks/use-toast";

interface GameProps {
  onExit: () => void;
  level: number;
  onLevelComplete: (stars: number, score: number) => void;
}

export const Game = ({ onExit, level, onLevelComplete }: GameProps) => {
  const [score, setScore] = useState(0);
  const [potholes, setPotholes] = useState<{ id: number; x: number; y: number }[]>([]);
  const [gameTime, setGameTime] = useState(60); // 60 seconds per level
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  // Calculate difficulty based on level
  const difficulty = {
    potholeCount: Math.min(5 + Math.floor(level / 2), 15),
    carSpeed: Math.min(3 + level * 0.5, 8),
    timeLimit: Math.max(60 - level * 2, 30),
  };

  useEffect(() => {
    // Generate potholes based on level difficulty
    const initialPotholes = Array.from({ length: difficulty.potholeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
    setPotholes(initialPotholes);
    setGameTime(difficulty.timeLimit);
  }, [level]);

  // Timer countdown
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
    setPotholes(current => current.filter(p => p.id !== id));
    setScore(s => s + 100);
    toast({
      title: "Pothole Fixed!",
      description: "+100 points",
    });

    // Check if level is complete
    if (potholes.length === 1) {
      handleLevelEnd();
    }
  };

  const handleLevelEnd = () => {
    setIsComplete(true);
    const stars = calculateStars();
    onLevelComplete(stars, score);
  };

  const calculateStars = () => {
    const maxScore = difficulty.potholeCount * 100;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    return 1;
  };

  return (
    <div className="game-container">
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

      {/* Tutorial messages for first 4 levels */}
      {level <= 4 && (
        <div className="absolute top-20 left-4 right-4 text-center bg-black/80 text-white p-4 rounded-lg">
          {level === 1 && "Click on potholes to repair them!"}
          {level === 2 && "Watch out for cars - they're getting faster!"}
          {level === 3 && "Time is limited - fix potholes quickly!"}
          {level === 4 && "More potholes appear in higher levels!"}
        </div>
      )}
      
      {/* Cars going in opposite directions */}
      <Car emoji="🚗" lane={1} speed={difficulty.carSpeed} direction="right" />
      <Car emoji="🚙" lane={2} speed={difficulty.carSpeed} direction="left" />
      <Car emoji="🚐" lane={3} speed={difficulty.carSpeed} direction="right" />

      {/* Potholes */}
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
          stars={calculateStars()}
          onNextLevel={() => {
            onLevelComplete(calculateStars(), score);
          }}
          onRetry={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};