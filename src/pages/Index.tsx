import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/Menu";
import { Game } from "@/components/Game";
import { LevelSelector } from "@/components/LevelSelector";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState<Record<number, { stars: number; score: number }>>({});

  const handleLevelComplete = (stars: number, score: number) => {
    setLevelProgress(prev => ({
      ...prev,
      [currentLevel]: { stars, score }
    }));
    setCurrentLevel(prev => prev + 1);
    setGameStarted(false);
    setShowLevelSelector(true);
  };

  const handleLevelSelect = (level: number) => {
    setCurrentLevel(level);
    setShowLevelSelector(false);
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setShowLevelSelector(false);
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 p-4">
      {!gameStarted && !showLevelSelector && (
        <Menu 
          onStartGame={() => setShowLevelSelector(true)} 
        />
      )}

      {showLevelSelector && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-8 text-center">Select Level</h2>
          <LevelSelector 
            onLevelSelect={handleLevelSelect}
            currentLevel={currentLevel}
            levelStars={Object.fromEntries(
              Object.entries(levelProgress).map(([level, data]) => [level, data.stars])
            )}
            onBackToMenu={handleBackToMenu}
          />
        </div>
      )}

      {gameStarted && (
        <Game 
          onExit={() => {
            setGameStarted(false);
            setShowLevelSelector(true);
          }}
          level={currentLevel}
          onLevelComplete={handleLevelComplete}
        />
      )}
    </div>
  );
};

export default Index;