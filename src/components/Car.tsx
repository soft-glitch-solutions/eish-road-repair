import { motion } from "framer-motion";

interface CarProps {
  emoji: string;
  lane: number;
  speed: number;
  direction: "left" | "right";
}

export const Car = ({ emoji, lane, speed, direction }: CarProps) => {
  return (
    <motion.div
      className="car"
      style={{
        top: `${lane * 25}%`,
      }}
      initial={{ x: direction === "right" ? "-100%" : "100%" }}
      animate={{ x: direction === "right" ? "100%" : "-100%" }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        delay: lane * 0.5,
      }}
    >
      {direction === "left" ? emoji : emoji}
    </motion.div>
  );
};