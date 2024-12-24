export const calculateDifficulty = (level: number) => {
  return {
    potholeCount: Math.min(5 + Math.floor(level / 2), 15),
    carSpeed: Math.min(3 + level * 0.5, 8),
    timeLimit: Math.max(60 - level * 2, 30),
  };
};

export const calculateStars = (score: number, maxPotholes: number) => {
  const maxScore = maxPotholes * 100;
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 3;
  if (percentage >= 70) return 2;
  return 1;
};