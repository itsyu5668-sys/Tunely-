import { motion, AnimatePresence } from "framer-motion";
import { NearbyUser } from "@/data/mockUsers";
import { MapPin, Music2, Crown } from "lucide-react";
import { TasteMatchBadge } from "./TasteMatchBadge";

interface MapViewProps {
  users: NearbyUser[];
  onUserSelect: (user: NearbyUser) => void;
}

export function MapView({ users, onUserSelect }: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-muted/30 overflow-hidden">
      {/* Map Background with subtle grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          }}
        />
      </div>

      {/* Center marker (You) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/30 rounded-full w-16 h-16 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "50%", top: "50%" }}
          />
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg tunely-glow">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary whitespace-nowrap">
            You
          </span>
        </div>
      </div>

      {/* User Avatars */}
      <AnimatePresence>
        {users.map((user, index) => (
          <motion.button
            key={user.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
            onClick={() => onUserSelect(user)}
            className="absolute z-10 group cursor-pointer"
            style={{
              left: `${user.location.x}%`,
              top: `${user.location.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Song Bubble */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="tunely-song-bubble absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center gap-1"
            >
              <div className="flex items-center gap-2">
                {user.isPlaying && (
                  <Music2 className="w-3 h-3 text-primary animate-pulse" />
                )}
                <span className="text-xs font-medium truncate max-w-[120px]">
                  {user.song.title}
                </span>
              </div>
              <TasteMatchBadge percentage={user.tasteMatch} size="sm" showLabel={false} />
            </motion.div>

            {/* Avatar */}
            <div className="relative">
              {user.isOnline && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
                />
              )}
              <img
                src={user.avatar}
                alt={user.name}
                className={`w-12 h-12 rounded-full object-cover border-2 transition-all group-hover:scale-110 ${
                  user.isOnline ? "border-primary tunely-glow" : "border-border"
                }`}
              />
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
              )}
              {user.isPremium && (
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Distance */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-medium">
              {user.distance}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
