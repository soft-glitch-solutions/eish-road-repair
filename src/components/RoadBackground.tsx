import { motion } from "framer-motion";

export const RoadBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Main road */}
      <div className="absolute inset-0 bg-gray-700">
        {/* Road markings */}
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-yellow-400" />
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-yellow-400" />
        
        {/* Animated cars in background for ambiance */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: "100vw" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 text-2xl"
        >
          🚗
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: -100 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 text-2xl"
        >
          🚙
        </motion.div>
      </div>
    </div>
  );
};