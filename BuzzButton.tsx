import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Lock, Crown, MessageCircle, Heart, Flame } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

interface BuzzButtonProps {
  userId: string;
  userName: string;
  onBuzz?: (userId: string, buzzType: string) => void;
}

const BUZZ_TYPES = [
  { id: "same-vibe", label: "Same vibe! 🎵", icon: Flame },
  { id: "love-track", label: "Love this track! ❤️", icon: Heart },
  { id: "lets-chat", label: "Let's chat!", icon: MessageCircle, premiumOnly: true },
];

export function BuzzButton({ userId, userName, onBuzz }: BuzzButtonProps) {
  const { isPremium, buzzesRemaining, maxFreeBuzzes, useBuzz } = usePremium();
  const [showBuzzMenu, setShowBuzzMenu] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [sentBuzz, setSentBuzz] = useState<string | null>(null);

  const handleBuzzClick = () => {
    if (!isPremium && buzzesRemaining === 0) {
      setShowUpgradePrompt(true);
      return;
    }
    setShowBuzzMenu(true);
  };

  const handleSendBuzz = (buzzType: typeof BUZZ_TYPES[0]) => {
    if (buzzType.premiumOnly && !isPremium) {
      setShowBuzzMenu(false);
      setShowUpgradePrompt(true);
      return;
    }

    const success = useBuzz();
    if (success) {
      setSentBuzz(buzzType.id);
      onBuzz?.(userId, buzzType.id);
      setTimeout(() => setSentBuzz(null), 3000);
    } else {
      setShowUpgradePrompt(true);
    }
    setShowBuzzMenu(false);
  };

  return (
    <>
      {/* Main Buzz Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBuzzClick}
        disabled={!!sentBuzz}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
          sentBuzz
            ? "bg-primary/20 text-primary cursor-default"
            : "bg-gradient-to-r from-purple-500 to-primary text-white hover:shadow-lg hover:shadow-primary/25"
        }`}
      >
        {sentBuzz ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Buzz sent!</span>
            </motion.div>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            <span>Buzz</span>
            {!isPremium && (
              <span className="text-xs opacity-75">({buzzesRemaining}/{maxFreeBuzzes})</span>
            )}
          </>
        )}
      </motion.button>

      {/* Buzz Type Menu */}
      <AnimatePresence>
        {showBuzzMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBuzzMenu(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border rounded-t-3xl"
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-4">
                Send a Buzz to {userName}
              </h3>
              <div className="space-y-2 mb-4">
                {BUZZ_TYPES.map((buzzType) => (
                  <button
                    key={buzzType.id}
                    onClick={() => handleSendBuzz(buzzType)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                      buzzType.premiumOnly && !isPremium
                        ? "bg-muted/50 text-muted-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <buzzType.icon className="w-5 h-5" />
                      <span className="font-medium">{buzzType.label}</span>
                    </div>
                    {buzzType.premiumOnly && !isPremium && (
                      <div className="flex items-center gap-1 text-xs">
                        <Lock className="w-3 h-3" />
                        <span>Premium</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowBuzzMenu(false)}
                className="w-full py-3 text-muted-foreground font-medium"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Upgrade Prompt */}
      <AnimatePresence>
        {showUpgradePrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpgradePrompt(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50 p-6 bg-card border border-border rounded-3xl shadow-2xl max-w-sm mx-auto"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-muted-foreground mb-6">
                  {!isPremium && buzzesRemaining === 0
                    ? "You've used all your free buzzes today. Upgrade to get unlimited buzzes and unlock chat!"
                    : "Unlock unlimited buzzes, direct chat, and exclusive features!"}
                </p>
                <div className="space-y-3">
                  <button className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-primary text-white hover:shadow-lg transition-all">
                    Upgrade Now
                  </button>
                  <button
                    onClick={() => setShowUpgradePrompt(false)}
                    className="w-full py-3 text-muted-foreground font-medium"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
