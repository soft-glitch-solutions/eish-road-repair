import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Shovel, Droplet } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
}

const tools: Tool[] = [
  { id: 'hammer', name: 'Crack Open', icon: <Hammer className="w-8 h-8" />, color: 'bg-red-500' },
  { id: 'shovel', name: 'Clean', icon: <Shovel className="w-8 h-8" />, color: 'bg-yellow-500' },
  { id: 'tar', name: 'Apply Tar', icon: <Droplet className="w-8 h-8" />, color: 'bg-gray-800' },
];

interface RepairToolsProps {
  onToolSelect: (tool: string) => void;
  disabled: boolean;
}

export const RepairTools = ({ onToolSelect, disabled }: RepairToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolClick = (toolId: string) => {
    if (disabled) return;
    setSelectedTool(toolId);
    onToolSelect(toolId);
  };

  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-4 rounded-lg shadow-lg space-y-4">
      {tools.map((tool) => (
        <motion.div
          key={tool.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${tool.color} p-3 rounded-full cursor-pointer ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${selectedTool === tool.id ? 'ring-4 ring-primary' : ''}`}
          onClick={() => handleToolClick(tool.id)}
        >
          {tool.icon}
          <span className="sr-only">{tool.name}</span>
        </motion.div>
      ))}
    </div>
  );
};