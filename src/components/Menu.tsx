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
        <input type="checkbox" defaultChecked className="toggle" />
      </div>
      <div className="flex items-center justify-between">
        <span>Music</span>
        <input type="checkbox" defaultChecked className="toggle" />
      </div>
      <div className="flex items-center justify-between">
        <span>Difficulty</span>
        <select className="select select-bordered w-32">
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
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center"
    >
      <div className="relative py-8 sm:py-12">
        {/* South African themed decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#007A4D] via-[#FDB913] to-[#DE3831]" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#007A4D] via-[#FDB913] to-[#DE3831]" />
        </div>
        
        <img 
          src="/lovable-uploads/cdfab539-2399-47c8-b81d-52b7d3c41117.png" 
          alt="Eish Potholes Logo" 
          className="w-48 sm:w-64 mx-auto mb-8 hover:scale-105 transition-transform duration-300"
        />
        
        <div className="flex flex-col items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-xs"
          >
            <Button 
              onClick={onStartGame}
              className="w-full bg-[#FDB913] hover:bg-[#FDB913]/90 text-black text-xl px-8 py-6 rounded-xl shadow-lg font-bold transition-all duration-300 hover:shadow-xl"
            >
              Start Game
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex gap-2 bg-white/90 hover:bg-white transition-colors duration-300">
                  <Trophy className="w-4 h-4" />
                  High Scores
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>High Scores</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <HighScores />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex gap-2 bg-white/90 hover:bg-white transition-colors duration-300">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <GameSettings />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex gap-2 bg-white/90 hover:bg-white transition-colors duration-300">
                  <HelpCircle className="w-4 h-4" />
                  How to Play
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>How to Play</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <HowToPlay />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg text-black/80 max-w-2xl mx-auto px-4"
        >
          Take on the role of a road maintenance crew as you repair roads and manage traffic flow.
          Keep South Africa moving!
        </motion.p>
      </div>
    </motion.div>
  );
};