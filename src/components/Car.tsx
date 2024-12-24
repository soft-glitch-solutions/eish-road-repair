import { motion } from "framer-motion";

interface CarProps {
  emoji: string;
  lane: number;
}

export const Car = ({ emoji, lane }: CarProps) => {
  return (
    <motion.div
      className="car"
      style={{
        top: `${lane * 25}%`,
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
        delay: lane * 0.5,
      }}
    >
      {emoji}
    </motion.div>
  );
};