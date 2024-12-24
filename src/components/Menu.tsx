import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MenuProps {
  onStartGame: () => void;
}

export const Menu = ({ onStartGame }: MenuProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center pt-20"
    >
      <img 
        src="/lovable-uploads/cdfab539-2399-47c8-b81d-52b7d3c41117.png" 
        alt="Eish Potholes Logo" 
        className="w-64 mx-auto mb-8"
      />
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <Button 
          onClick={onStartGame}
          className="bg-primary hover:bg-primary/90 text-black text-xl px-8 py-6 rounded-xl shadow-lg"
        >
          Start Game
        </Button>
      </motion.div>

      <p className="mt-8 text-lg text-black/80">
        Take on the role of a road maintenance crew as you repair roads and manage traffic flow.
        Keep the city moving!
      </p>
    </motion.div>
  );
};