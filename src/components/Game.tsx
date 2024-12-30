import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car } from "@/components/Car";
import { Pothole } from "@/components/Pothole";
import { Score } from "@/components/Score";
import { LevelComplete } from "@/components/LevelComplete";
import { TutorialMessage } from "@/components/TutorialMessage";
import { RepairTools } from "@/components/RepairTools";
import { RepairProgress } from "@/components/RepairProgress";
import { calculateDifficulty, calculateStars } from "@/utils/gameDifficulty";
import { useToast } from "@/hooks/use-toast";
import ReactConfetti from 'react-confetti';
import { RoadBackground } from "@/components/RoadBackground";
import { motion } from "framer-motion";
import { X, Pause, Play } from 'lucide-react';

interface GameProps {
  onExit: () => void;
  level: number;
  onLevelComplete: (stars: number, score: number) => void;
}

interface PotholeState {
  id: number;
  x: number;
  y: number;
  repairStage: 'unrepaired' | 'cracked' | 'cleaned' | 'repaired';
}

export const Game = ({ onExit, level, onLevelComplete }: GameProps) => {
  const [score, setScore] = useState(0);
  const [potholes, setPotholes] = useState<PotholeState[]>([]);
  const [gameTime, setGameTime] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const difficulty = calculateDifficulty(level);

  useEffect(() => {
    const initialPotholes = Array.from({ length: difficulty.potholeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      repairStage: 'unrepaired' as const,
    }));
    setPotholes(initialPotholes);
    setGameTime(difficulty.timeLimit);
  }, [level, difficulty.potholeCount, difficulty.timeLimit]);

  useEffect(() => {
    if (gameTime > 0 && !isComplete && !isPaused) {
      const timer = setInterval(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameTime === 0 && !isComplete) {
      handleLevelEnd();
    }
  }, [gameTime, isComplete, isPaused]);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handlePotholeClick = async (potholeId: number) => {
    if (!selectedTool || isRepairing || isPaused) return;

    const pothole = potholes.find(p => p.id === potholeId);
    if (!pothole) return;

    const toolStages = {
      hammer: 'cracked',
      shovel: 'cleaned',
      tar: 'repaired'
    };

    const stageOrder = ['unrepaired', 'cracked', 'cleaned', 'repaired'];
    const currentStageIndex = stageOrder.indexOf(pothole.repairStage);
    const expectedTool = Object.keys(toolStages)[currentStageIndex];

    if (selectedTool !== expectedTool) {
      toast({
        title: "Wrong tool!",
        description: `You need to ${expectedTool} first`,
        variant: "destructive"
      });
      return;
    }

    setIsRepairing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPotholes(current => {
      const newPotholes = current.map(p => {
        if (p.id === potholeId) {
          return {
            ...p,
            repairStage: toolStages[selectedTool as keyof typeof toolStages] as PotholeState['repairStage']
          };
        }
        return p;
      });

      const allRepaired = newPotholes.every(p => p.repairStage === 'repaired');
      if (allRepaired) {
        setTimeout(() => {
          handleLevelEnd();
        }, 0);
      }

      return newPotholes;
    });

    setScore(prev => prev + 100);
    toast({
      title: "Progress!",
      description: "+100 points",
    });

    setIsRepairing(false);
    setSelectedTool(null);
  };

  const handleLevelEnd = () => {
    setIsComplete(true);
    const stars = calculateStars(score, difficulty.potholeCount);
    toast({
      title: "Level Complete!",
      description: `You earned ${stars} stars!`,
      duration: 3000,
    });
  };

  const handleNextLevel = () => {
    const stars = calculateStars(score, difficulty.potholeCount);
    onLevelComplete(stars, score);
  };

  const repairedCount = potholes.filter(p => p.repairStage === 'repaired').length;

  const getCity = () => {
    if (level <= 12) return "cape-town";
    if (level <= 24) return "johannesburg";
    return "durban";
  };

  return (
    <div className="game-container">
      {isComplete && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      <RoadBackground city={getCity()} />
      
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex gap-4">
          <div className="bg-primary text-black px-4 py-2 rounded-lg">
            Score: {score}
          </div>
          <div className="bg-primary text-black px-4 py-2 rounded-lg">
            Time: {gameTime}s
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsPaused(!isPaused)}
            variant="secondary"
            size="icon"
            className="hover:bg-gray-200"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={onExit}
            variant="secondary"
            size="icon"
            className="hover:bg-red-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TutorialMessage level={level} />
      
      <RepairProgress 
        totalPotholes={potholes.length}
        repairedCount={repairedCount}
      />

      {potholes.map(pothole => (
        <motion.div
          key={pothole.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Pothole
            x={pothole.x}
            y={pothole.y}
            repairStage={pothole.repairStage}
            onClick={() => handlePotholeClick(pothole.id)}
          />
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-4 right-4">
        <RepairTools 
          onToolSelect={handleToolSelect}
          disabled={isRepairing || isComplete || isPaused}
          selectedTool={selectedTool}
        />
      </div>

      {isComplete && (
        <LevelComplete
          level={level}
          score={score}
          stars={calculateStars(score, difficulty.potholeCount)}
          onNextLevel={handleNextLevel}
          onRetry={() => window.location.reload()}
        />
      )}
    </div>
  );
};
