import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car } from "@/components/Car";
import { Pothole } from "@/components/Pothole";
import { Score } from "@/components/Score";
import { useToast } from "@/hooks/use-toast";

interface GameProps {
  onExit: () => void;
}

export const Game = ({ onExit }: GameProps) => {
  const [score, setScore] = useState(0);
  const [potholes, setPotholes] = useState<{ id: number; x: number; y: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Generate initial potholes
    const initialPotholes = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
    }));
    setPotholes(initialPotholes);
  }, []);

  const handlePotholeClick = (id: number) => {
    setPotholes(current => current.filter(p => p.id !== id));
    setScore(s => s + 100);
    toast({
      title: "Pothole Fixed!",
      description: "+100 points",
    });
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
      
      {/* Cars */}
      <Car emoji="🚗" lane={1} />
      <Car emoji="🚙" lane={2} />
      <Car emoji="🚐" lane={3} />

      {/* Potholes */}
      {potholes.map(pothole => (
        <Pothole
          key={pothole.id}
          x={pothole.x}
          y={pothole.y}
          onClick={() => handlePotholeClick(pothole.id)}
        />
      ))}
    </div>
  );
};