import { motion } from "framer-motion";

interface RoadBackgroundProps {
  city?: "cape-town" | "johannesburg" | "durban";
}

export const RoadBackground = ({ city = "cape-town" }: RoadBackgroundProps) => {
  const cityBackgrounds = {
    "cape-town": "/lovable-uploads/1bb7e077-b56d-44f3-b6f7-649116701e55.png",
    "johannesburg": "/lovable-uploads/9ce51d91-7f8b-4184-9c4c-a836dbe0e1b4.png",
    "durban": "/lovable-uploads/6bf7f1e0-1afc-437c-b555-104249c9609b.png"
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* City background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(${cityBackgrounds[city]})`,
          filter: "brightness(0.7)"
        }}
      />

      {/* Road surface */}
      <div className="absolute inset-0 bg-gray-700/80">
        {/* Road markings */}
        <div className="absolute inset-y-0 left-1/2 w-4 bg-yellow-400" />
        <div className="absolute inset-x-0 top-1/4 h-2 bg-white opacity-80" />
        <div className="absolute inset-x-0 bottom-1/4 h-2 bg-white opacity-80" />
        
        {/* Animated cars */}
        <Car type="taxi" lane={1} speed={5} direction="left" />
        <Car type="polo" lane={2} speed={6} direction="right" />
      </div>
    </div>
  );
};