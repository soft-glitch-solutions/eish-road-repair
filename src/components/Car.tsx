import { motion } from "framer-motion";

interface CarProps {
  type: "taxi" | "polo";
  lane: number;
  speed: number;
  direction: "left" | "right";
}

export const Car = ({ type, lane, speed, direction }: CarProps) => {
  const carImage = type === "taxi" 
    ? "/lovable-uploads/f43ada27-791c-4095-9220-d1d42f7aec6c.png"
    : "/lovable-uploads/5e954550-9334-47c6-870a-d1940471d8bf.png";

  return (
    <motion.div
      className="car absolute"
      style={{
        top: `${lane * 25}%`,
        width: "100px",
        height: "50px",
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
      <img 
        src={carImage} 
        alt={type === "taxi" ? "Taxi" : "VW Polo"}
        style={{
          width: "100%",
          height: "100%",
          transform: direction === "left" ? "scaleX(-1)" : "none",
        }}
      />
    </motion.div>
  );
};