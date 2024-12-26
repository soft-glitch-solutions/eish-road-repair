import { Progress } from "@/components/ui/progress";

interface RepairProgressProps {
  totalPotholes: number;
  repairedCount: number;
}

export const RepairProgress = ({ totalPotholes, repairedCount }: RepairProgressProps) => {
  const progressPercentage = Math.round((repairedCount / totalPotholes) * 100);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-96 bg-white/90 p-4 rounded-lg">
      <div className="text-center mb-2">Road Repair Progress</div>
      <Progress value={progressPercentage} className="h-3" />
      <div className="text-center mt-2">{progressPercentage}%</div>
    </div>
  );
};