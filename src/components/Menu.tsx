import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Trophy, Settings, HelpCircle } from "lucide-react";

interface MenuProps {
  onStartGame: () => void;
}

const HighScores = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">High Scores</h3>
    <div className="space-y-2">
      {[
        { name: "Player 1", score: 10000 },
        { name: "Player 2", score: 8500 },
        { name: "Player 3", score: 7200 },
      ].map((score, i) => (
        <div key={i} className="flex justify-between items-center bg-primary/10 p-2 rounded">
          <span>{score.name}</span>
          <span className="font-bold">{score.score}</span>
        </div>
      ))}
    </div>
  </div>
);

const GameSettings = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">Settings</h3>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span>Sound Effects</span>
        <input type="checkbox" className="toggle" />
      </div>
      <div className="flex items-center justify-between">
        <span>Music</span>
        <input type="checkbox" className="toggle" />
      </div>
      <div className="flex items-center justify-between">
        <span>Difficulty</span>
        <select className="select select-bordered">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    </div>
  </div>
);

const HowToPlay = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">How to Play</h3>
    <div className="space-y-2 text-left">
      <p>1. Select a tool from the bottom toolbar</p>
      <p>2. Drag the tool to a pothole to start repairs</p>
      <p>3. Complete repairs in the correct order:</p>
      <ul className="list-disc pl-6">
        <li>Crack open the surface</li>
        <li>Clean the area</li>
        <li>Apply new tar</li>
      </ul>
      <p>4. Watch out for traffic while working!</p>
      <p>5. Complete repairs quickly to earn more stars</p>
    </div>
  </div>
);

export const Menu = ({ onStartGame }: MenuProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center pt-10"
    >
      <img 
        src="/lovable-uploads/cdfab539-2399-47c8-b81d-52b7d3c41117.png" 
        alt="Eish Potholes Logo" 
        className="w-64 mx-auto mb-8"
      />
      
      <div className="flex flex-col gap-4 items-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <Button 
            onClick={onStartGame}
            className="bg-primary hover:bg-primary/90 text-black text-xl px-8 py-6 rounded-xl shadow-lg w-48"
          >
            Start Game
          </Button>
        </motion.div>

        <div className="flex gap-4 mt-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Trophy className="w-4 h-4" />
                High Scores
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>High Scores</SheetTitle>
              </SheetHeader>
              <HighScores />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <GameSettings />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <HelpCircle className="w-4 h-4" />
                How to Play
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>How to Play</SheetTitle>
              </SheetHeader>
              <HowToPlay />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <p className="mt-8 text-lg text-black/80">
        Take on the role of a road maintenance crew as you repair roads and manage traffic flow.
        Keep the city moving!
      </p>
    </motion.div>
  );
};