import { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  buzzesRemaining: number;
  maxFreeBuzzes: number;
  useBuzz: () => boolean;
  resetBuzzes: () => void;
  // For demo purposes - toggle premium status
  togglePremium: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [buzzesRemaining, setBuzzesRemaining] = useState(3); // Free users get 3 buzzes per day
  const maxFreeBuzzes = 3;

  const useBuzz = () => {
    if (isPremium) return true;
    if (buzzesRemaining > 0) {
      setBuzzesRemaining((prev) => prev - 1);
      return true;
    }
    return false;
  };

  const resetBuzzes = () => {
    setBuzzesRemaining(maxFreeBuzzes);
  };

  const togglePremium = () => {
    setIsPremium((prev) => !prev);
  };

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        buzzesRemaining,
        maxFreeBuzzes,
        useBuzz,
        resetBuzzes,
        togglePremium,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
}
