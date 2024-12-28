import { useState } from 'react';
import { Menu } from "@/components/Menu";
import { Game } from "@/components/Game";
import { LevelSelector } from "@/components/LevelSelector";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState<Record<number, { stars: number; score: number }>>({});

  const handleLevelComplete = (stars: number, score: number) => {
    console.log('Level completed:', { stars, score });
    setLevelProgress(prev => ({
      ...prev,
      [currentLevel]: { stars, score }
    }));
    setCurrentLevel(prev => prev + 1);
    setGameStarted(false);
    setShowLevelSelector(true);
  };

  const handleLevelSelect = (level: number) => {
    console.log('Level selected:', level);
    setCurrentLevel(level);
    setShowLevelSelector(false);
    setGameStarted(true);
  };

  const handleStartGame = () => {
    console.log('Starting game...');
    setShowLevelSelector(true);
  };

  const handleBackToMenu = () => {
    console.log('Returning to menu...');
    setShowLevelSelector(false);
    setGameStarted(false);
  };

  console.log('Current game state:', { gameStarted, showLevelSelector, currentLevel });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 p-4">
      {!gameStarted && !showLevelSelector && (
        <Menu onStartGame={handleStartGame} />
      )}

      {showLevelSelector && (
        <div className="max-w-4xl mx-auto">
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