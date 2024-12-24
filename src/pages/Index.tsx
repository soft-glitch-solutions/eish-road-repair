import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/Menu";
import { Game } from "@/components/Game";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 p-4">
      {!gameStarted ? (
        <Menu onStartGame={() => setGameStarted(true)} />
      ) : (
        <Game onExit={() => setGameStarted(false)} />
      )}
    </div>
  );
};

export default Index;