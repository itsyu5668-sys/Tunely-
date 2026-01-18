import { Crown, Lock } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

interface PremiumBadgeProps {
  className?: string;
}

export function PremiumBadge({ className = "" }: PremiumBadgeProps) {
  const { isPremium } = usePremium();

  if (!isPremium) return null;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-primary rounded-full text-xs font-semibold text-white ${className}`}
    >
      <Crown className="w-3 h-3" />
      <span>PRO</span>
    </div>
  );
}

interface LockedFeatureProps {
  children: React.ReactNode;
  featureName?: string;
  onUpgradeClick?: () => void;
}

export function LockedFeature({ children, featureName = "feature", onUpgradeClick }: LockedFeatureProps) {
  const { isPremium } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">{children}</div>
      <button
        onClick={onUpgradeClick}
        className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl"
      >
        <Lock className="w-6 h-6 text-muted-foreground mb-2" />
        <span className="text-sm font-medium text-muted-foreground">
          Upgrade to unlock {featureName}
        </span>
      </button>
    </div>
  );
}
