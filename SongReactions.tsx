import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SongReactionsProps {
  songId: string;
  existingReactions?: Record<string, number>;
  onReact?: (emoji: string) => void;
}

const REACTION_EMOJIS = ["🔥", "❤️", "🎵", "💯", "🙌"];

export function SongReactions({ songId, existingReactions = {}, onReact }: SongReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, number>>(existingReactions);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleReact = (emoji: string) => {
    if (userReaction === emoji) {
      // Remove reaction
      setReactions((prev) => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1),
      }));
      setUserReaction(null);
    } else {
      // Remove old reaction if exists
      if (userReaction) {
        setReactions((prev) => ({
          ...prev,
          [userReaction]: Math.max(0, (prev[userReaction] || 0) - 1),
        }));
      }
      // Add new reaction
      setReactions((prev) => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1,
      }));
      setUserReaction(emoji);
    }
    setShowPicker(false);
    onReact?.(emoji);
  };

  const activeReactions = Object.entries(reactions).filter(([_, count]) => count > 0);

  return (
    <div className="flex items-center gap-2">
      {/* Existing reactions */}
      <div className="flex gap-1">
        {activeReactions.map(([emoji, count]) => (
          <motion.button
            key={emoji}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleReact(emoji)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
              userReaction === emoji
                ? "bg-primary/20 text-primary"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span>{emoji}</span>
            <span className="font-medium">{count}</span>
          </motion.button>
        ))}
      </div>

      {/* Add reaction button */}
      <div className="relative">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
        >
          <span className="text-sm">+</span>
        </button>

        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex gap-1 p-2 bg-card border border-border rounded-xl shadow-lg z-50"
            >
              {REACTION_EMOJIS.map((emoji) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleReact(emoji)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                    userReaction === emoji ? "bg-primary/20" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-lg">{emoji}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
