import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Shovel, Droplet } from 'lucide-react';
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core';

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

const DraggableTool = ({ tool, cooldown }: { tool: Tool; cooldown: number }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tool.id,
  });

  const cooldownPercentage = (cooldown / tool.cooldown) * 100;
  const dashArray = 2 * Math.PI * 20; // Circle circumference
  const dashOffset = dashArray * ((100 - cooldownPercentage) / 100);

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative ${tool.color} p-3 rounded-full cursor-grab active:cursor-grabbing transition-transform hover:scale-105 ${
        cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {tool.icon}
      {cooldown > 0 && (
        <svg
          className="absolute inset-0 -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 44 44"
        >
          <circle
            className="stroke-white/20 fill-none"
            cx="22"
            cy="22"
            r="20"
            strokeWidth="4"
          />
          <circle
            className="stroke-white fill-none transition-all duration-100"
            cx="22"
            cy="22"
            r="20"
            strokeWidth="4"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
      )}
    </motion.div>
  );
};

interface RepairToolsProps {
  onToolSelect: (tool: string) => void;
  disabled: boolean;
}

export const RepairTools = ({ onToolSelect, disabled }: RepairToolsProps) => {
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});

  const handleDragEnd = (event: DragEndEvent) => {
    if (disabled || cooldowns[event.active.id as string] > 0) return;
    onToolSelect(event.active.id as string);
    setCooldowns(prev => ({ ...prev, [event.active.id]: 2000 }));

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 2000 - elapsed);

      setCooldowns(prev => ({ ...prev, [event.active.id]: remaining }));

      if (remaining > 0) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 p-4 rounded-lg shadow-lg flex space-x-4">
        {tools.map((tool) => (
          <DraggableTool
            key={tool.id}
            tool={tool}
            cooldown={cooldowns[tool.id] || 0}
          />
        ))}
      </div>
    </DndContext>
  );
};