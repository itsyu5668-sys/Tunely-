import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TasteMatchBadgeProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function TasteMatchBadge({ percentage, size = "md", showLabel = true }: TasteMatchBadgeProps) {
  const getMatchColor = () => {
    if (percentage >= 80) return "text-primary";
    if (percentage >= 60) return "text-accent-foreground";
    if (percentage >= 40) return "text-yellow-500";
    return "text-muted-foreground";
  };

  const getMatchBg = () => {
    if (percentage >= 80) return "bg-primary/20";
    if (percentage >= 60) return "bg-accent/50";
    if (percentage >= 40) return "bg-yellow-500/20";
    return "bg-muted";
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center rounded-full font-semibold ${getMatchBg()} ${getMatchColor()} ${sizeClasses[size]}`}
    >
      <Sparkles className={iconSizes[size]} />
      <span>{percentage}%</span>
      {showLabel && <span className="font-normal opacity-80">match</span>}
    </motion.div>
  );
}

// Calculate taste match based on shared genres
export function calculateTasteMatch(userGenres: string[], otherGenres: string[]): number {
  if (!userGenres.length || !otherGenres.length) return 0;
  
  const sharedGenres = userGenres.filter((genre) =>
    otherGenres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
  
  const totalUniqueGenres = new Set([...userGenres, ...otherGenres]).size;
  const matchPercentage = Math.round((sharedGenres.length / Math.min(userGenres.length, otherGenres.length)) * 100);
  
  return Math.min(100, matchPercentage);
}
