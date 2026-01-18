import { motion } from "framer-motion";
import { User, Eye, EyeOff, MapPin, Music2, LogOut, ChevronRight, Shield } from "lucide-react";

interface PrivacySettings {
  invisible: boolean;
  hideSong: boolean;
  hideLocation: boolean;
}

interface ProfilePageProps {
  privacy: PrivacySettings;
  onPrivacyChange: (key: keyof PrivacySettings) => void;
}

export function ProfilePage({ privacy, onPrivacyChange }: ProfilePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6 pb-24"
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center tunely-glow">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-muted rounded-full flex items-center justify-center border-2 border-background">
            <span className="text-xs">✏️</span>
          </button>
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">Your Profile</h2>
        <p className="text-muted-foreground">Connect Spotify to get started</p>
        
        <button className="mt-4 tunely-button-primary flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Connect Spotify
        </button>
      </div>

      {/* Privacy Controls */}
      <div className="tunely-card p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Privacy Controls</h3>
            <p className="text-sm text-muted-foreground">Manage what others can see</p>
          </div>
        </div>

        <div className="space-y-3">
          <PrivacyToggle
            icon={EyeOff}
            label="Invisible Mode"
            description="Hide from all nearby users"
            enabled={privacy.invisible}
            onToggle={() => onPrivacyChange("invisible")}
          />
          <PrivacyToggle
            icon={Music2}
            label="Hide Current Song"
            description="Others won't see what you're playing"
            enabled={privacy.hideSong}
            onToggle={() => onPrivacyChange("hideSong")}
          />
          <PrivacyToggle
            icon={MapPin}
            label="Hide Location"
            description="Appear in feed but not on map"
            enabled={privacy.hideLocation}
            onToggle={() => onPrivacyChange("hideLocation")}
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="tunely-card overflow-hidden">
        <MenuItem icon={User} label="Edit Profile" />
        <MenuItem icon={Music2} label="Listening History" />
        <MenuItem icon={Eye} label="Who Viewed Your Profile" badge="3" />
        <MenuItem icon={LogOut} label="Sign Out" danger />
      </div>
    </motion.div>
  );
}

function PrivacyToggle({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
}: {
  icon: typeof Eye;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <div className="text-left">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div
        className={`w-12 h-7 rounded-full p-1 transition-colors ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-5 h-5 bg-background rounded-full shadow-sm"
        />
      </div>
    </button>
  );
}

function MenuItem({
  icon: Icon,
  label,
  badge,
  danger,
}: {
  icon: typeof User;
  label: string;
  badge?: string;
  danger?: boolean;
}) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
        <span className={`font-medium ${danger ? "text-destructive" : "text-foreground"}`}>
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  );
}
