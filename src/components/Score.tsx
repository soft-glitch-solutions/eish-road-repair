import { motion } from "framer-motion";

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => {
  return (
    <motion.div
      className="absolute top-4 left-4 bg-primary text-black px-4 py-2 rounded-lg font-bold text-xl"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring" }}
    >
      Score: {score}
    </motion.div>
  );
};