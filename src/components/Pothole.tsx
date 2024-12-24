import { motion } from "framer-motion";

interface PotholeProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const Pothole = ({ x, y, onClick }: PotholeProps) => {
  return (
    <motion.div
      className="pothole cursor-pointer"
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