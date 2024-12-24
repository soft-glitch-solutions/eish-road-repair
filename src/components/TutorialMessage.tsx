interface TutorialMessageProps {
  level: number;
}

export const TutorialMessage = ({ level }: TutorialMessageProps) => {
  if (level > 4) return null;

  return (
    <div className="absolute top-20 left-4 right-4 text-center bg-black/80 text-white p-4 rounded-lg">
      {level === 1 && "Click on potholes to repair them!"}
      {level === 2 && "Watch out for cars - they're getting faster!"}
      {level === 3 && "Time is limited - fix potholes quickly!"}
      {level === 4 && "More potholes appear in higher levels!"}
    </div>
  );
};