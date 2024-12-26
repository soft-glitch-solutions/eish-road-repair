import { motion } from "framer-motion";

export const RoadBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Road surface */}
      <div className="absolute inset-0 bg-gray-700">
        {/* Road markings */}
        <div className="absolute inset-y-0 left-1/2 w-4 bg-yellow-400" />
        <div className="absolute inset-x-0 top-1/4 h-2 bg-white opacity-80" />
        <div className="absolute inset-x-0 bottom-1/4 h-2 bg-white opacity-80" />
        
        {/* Animated cars */}
        <motion.div
          className="absolute top-1/4 -translate-y-1/2 text-2xl"
          animate={{
            x: ["100%", "-10%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🚗
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 -translate-y-1/2 text-2xl scale-x-[-1]"
          animate={{
            x: ["-10%", "100%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🚙
        </motion.div>
      </div>
    </div>
  );
};