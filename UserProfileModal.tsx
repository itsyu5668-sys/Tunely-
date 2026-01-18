import { motion, AnimatePresence } from "framer-motion";
import { NearbyUser } from "@/data/mockUsers";
import { X, MapPin, Music2, UserPlus, UserCheck, ExternalLink, Crown, MessageCircle } from "lucide-react";
import { TasteMatchBadge } from "./TasteMatchBadge";
import { SongReactions } from "./SongReactions";
import { BuzzButton } from "./BuzzButton";
import { usePremium } from "@/contexts/PremiumContext";
import { toast } from "@/hooks/use-toast";

interface UserProfileModalProps {
  user: NearbyUser | null;
  onClose: () => void;
  onFollow: (userId: string) => void;
}

export function UserProfileModal({ user, onClose, onFollow }: UserProfileModalProps) {
  const { isPremium } = usePremium();
  
  const handleBuzz = (userId: string, buzzType: string) => {
    console.log(`Buzzed ${userId} with type: ${buzzType}`);
  };

  const handleMessage = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Direct messaging is available for Tunely Premium members.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Coming Soon",
      description: "Direct messaging is being implemented for Premium users.",
    });
  };

  const openSpotify = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {user && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl bg-card border-t border-border shadow-2xl"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="px-6 pb-8 pt-2 overflow-y-auto max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover tunely-avatar-ring"
                  />
                  {user.isOnline && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-primary rounded-full border-3 border-card" />
                  )}
                  {user.isPremium && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center">
                      <Crown className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                    <TasteMatchBadge percentage={user.tasteMatch} size="md" />
                  </div>
                  <p className="text-muted-foreground">{user.username}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{user.distance} away</span>
                    {user.isOnline && (
                      <span className="flex items-center gap-1 text-primary">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Online
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-4 text-foreground">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-lg font-bold text-foreground">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{user.tasteMatch}%</p>
                  <p className="text-sm text-muted-foreground">Taste Match</p>
                </div>
              </div>

              {/* Genres */}
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Favorite Genres</p>
                <div className="flex flex-wrap gap-2">
                  {user.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1.5 bg-accent rounded-full text-sm font-medium text-accent-foreground"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Currently Playing */}
              <div className="mt-6">
                <p className="text-sm font-medium text-muted-foreground mb-3">Currently Playing</p>
                <div className="bg-muted/50 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.song.albumArt}
                      alt={user.song.title}
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {user.isPlaying && (
                          <Music2 className="w-4 h-4 text-primary animate-pulse" />
                        )}
                        <p className="font-semibold text-foreground">{user.song.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.song.artist}</p>
                    </div>
                    <button 
                      onClick={() => openSpotify(user.song.spotifyUrl)}
                      className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Song Reactions */}
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <SongReactions 
                      songId={`${user.id}-${user.song.title}`} 
                      existingReactions={user.song.reactions}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onFollow(user.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all ${
                      user.isFollowing
                        ? "bg-muted text-muted-foreground"
                        : "tunely-button-primary"
                    }`}
                  >
                    {user.isFollowing ? (
                      <>
                        <UserCheck className="w-5 h-5" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Follow
                      </>
                    )}
                  </button>
                  <BuzzButton 
                    userId={user.id} 
                    userName={user.name.split(' ')[0]} 
                    onBuzz={handleBuzz}
                  />
                </div>
                
                <button
                  onClick={handleMessage}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message (Premium)
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
