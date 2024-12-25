import { motion } from "framer-motion";

interface PotholeProps {
  x: number;
  y: number;
  repairStage: 'unrepaired' | 'cracked' | 'cleaned' | 'repaired';
  onClick: () => void;
}

export const Pothole = ({ x, y, repairStage, onClick }: PotholeProps) => {
  const stageStyles = {
    unrepaired: 'bg-black',
    cracked: 'bg-red-500',
    cleaned: 'bg-yellow-500',
    repaired: 'bg-gray-800'
  };

  return (
    <motion.div
      className={`pothole cursor-pointer ${stageStyles[repairStage]}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    />
  );
};