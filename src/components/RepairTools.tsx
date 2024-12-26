import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Shovel, Droplet } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Tool {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  cooldown: number;
}

const tools: Tool[] = [
  { id: 'hammer', name: 'Crack Open', icon: <Hammer className="w-8 h-8" />, color: 'bg-red-500', cooldown: 2000 },
  { id: 'shovel', name: 'Clean', icon: <Shovel className="w-8 h-8" />, color: 'bg-yellow-500', cooldown: 2000 },
  { id: 'tar', name: 'Apply Tar', icon: <Droplet className="w-8 h-8" />, color: 'bg-gray-800', cooldown: 2000 },
];

interface RepairToolsProps {
  onToolSelect: (tool: string) => void;
  disabled: boolean;
}

export const RepairTools = ({ onToolSelect, disabled }: RepairToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [isAnimating, setIsAnimating] = useState<Record<string, boolean>>({});

  const handleToolClick = async (tool: Tool) => {
    if (disabled || cooldowns[tool.id] > 0) return;

    setSelectedTool(tool.id);
    onToolSelect(tool.id);

    // Start cooldown
    setCooldowns(prev => ({ ...prev, [tool.id]: 100 }));
    setIsAnimating(prev => ({ ...prev, [tool.id]: true }));

    // Animate cooldown
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / tool.cooldown) * 100);

      setCooldowns(prev => ({ ...prev, [tool.id]: remaining }));

      if (remaining > 0) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(prev => ({ ...prev, [tool.id]: false }));
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 p-4 rounded-lg shadow-lg flex space-x-4">
      {tools.map((tool) => (
        <div key={tool.id} className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${tool.color} p-3 rounded-full cursor-pointer ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${selectedTool === tool.id ? 'ring-4 ring-primary' : ''}`}
            onClick={() => handleToolClick(tool)}
          >
            {tool.icon}
          </motion.div>
          {isAnimating[tool.id] && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12">
              <Progress value={cooldowns[tool.id]} className="h-1" />
            </div>
          )}
          <span className="sr-only">{tool.name}</span>
        </div>
      ))}
    </div>
  );
};