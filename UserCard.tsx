import { motion } from "framer-motion";
import { NearbyUser } from "@/data/mockUsers";
import { Music2, MapPin, UserPlus, UserCheck, Crown } from "lucide-react";
import { TasteMatchBadge } from "./TasteMatchBadge";
import { SongReactions } from "./SongReactions";

interface UserCardProps {
  user: NearbyUser;
  onSelect: (user: NearbyUser) => void;
  onFollow: (userId: string) => void;
  index: number;
}

export function UserCard({ user, onSelect, onFollow, index }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="tunely-card p-4 cursor-pointer"
      onClick={() => onSelect(user)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar & Online Status */}
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className={`w-14 h-14 rounded-full object-cover ${
              user.isOnline ? "tunely-avatar-ring" : ""
            }`}
          />
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-card" />
          )}
          {user.isPremium && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                <TasteMatchBadge percentage={user.tasteMatch} size="sm" showLabel={false} />
              </div>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollow(user.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                user.isFollowing
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {user.isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Follow
                </>
              )}
            </button>
          </div>

          {/* Currently Playing */}
          <div className="mt-3 bg-muted/50 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <img
                src={user.song.albumArt}
                alt={user.song.title}
                className="w-12 h-12 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  {user.isPlaying && (
                    <Music2 className="w-3.5 h-3.5 text-primary animate-pulse flex-shrink-0" />
                  )}
                  <p className="font-medium text-sm truncate">{user.song.title}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.song.artist}</p>
              </div>
            </div>
            {/* Song Reactions */}
            <div className="mt-2 pt-2 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
              <SongReactions 
                songId={`${user.id}-${user.song.title}`} 
                existingReactions={user.song.reactions}
              />
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {user.distance}
            </span>
            <span>{user.followers.toLocaleString()} followers</span>
            <div className="flex gap-1.5">
              {user.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 bg-accent/50 rounded-full text-accent-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
