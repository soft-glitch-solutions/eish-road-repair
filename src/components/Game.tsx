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
    if (gameTime > 0 && !isComplete) {
      const timer = setInterval(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameTime === 0 && !isComplete) {
      handleLevelEnd();
    }
  }, [gameTime, isComplete]);

  const handleToolSelect = async (potholeId: number, tool: string) => {
    if (isRepairing) return;

    setIsRepairing(true);
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

    if (tool !== expectedTool) {
      toast({
        title: "Wrong tool!",
        description: `You need to ${expectedTool} first`,
        variant: "destructive"
      });
      setIsRepairing(false);
      return;
    }

    // Simulate repair time
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPotholes(current => {
      const newPotholes = current.map(p => {
        if (p.id === potholeId) {
          return {
            ...p,
            repairStage: toolStages[tool as keyof typeof toolStages] as PotholeState['repairStage']
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

  return (
    <div className="game-container">
      {isComplete && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      <RoadBackground />
      
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
      
      <RepairProgress 
        totalPotholes={potholes.length}
        repairedCount={repairedCount}
      />

      <RepairTools 
        onToolSelect={(tool) => {
          const unfinishedPothole = potholes.find(p => p.repairStage !== 'repaired');
          if (unfinishedPothole) {
            handleToolSelect(unfinishedPothole.id, tool);
          }
        }}
        disabled={isRepairing || isComplete}
      />

      {potholes.map(pothole => (
        <Pothole
          key={pothole.id}
          x={pothole.x}
          y={pothole.y}
          repairStage={pothole.repairStage}
          onClick={() => {
            if (!isRepairing && pothole.repairStage !== 'repaired') {
              const nextTool = {
                unrepaired: 'hammer',
                cracked: 'shovel',
                cleaned: 'tar'
              }[pothole.repairStage];
              if (nextTool) {
                handleToolSelect(pothole.id, nextTool);
              }
            }
          }}
        />
      ))}

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
