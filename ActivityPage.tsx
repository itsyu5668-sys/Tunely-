import { motion } from "framer-motion";
import { Bell, UserPlus, Heart, Music2, Sparkles } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "follow",
    user: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    action: "started following you",
    time: "2m ago",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "like",
    user: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    action: "liked your profile",
    time: "15m ago",
    icon: Heart,
  },
  {
    id: 3,
    type: "nearby",
    user: "Jordan Taylor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    action: "is listening to the same song as you",
    song: "Blinding Lights",
    time: "1h ago",
    icon: Music2,
  },
  {
    id: 4,
    type: "feature",
    title: "New Feature",
    message: "Discover Weekly playlist is now live!",
    time: "3h ago",
    icon: Sparkles,
  },
];

export function ActivityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Activity</h1>
        <button className="text-sm text-primary font-medium">Mark all read</button>
      </div>

      {/* Today */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">Today</h2>
        <div className="space-y-3">
          {activities.slice(0, 2).map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>

      {/* Earlier */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">Earlier</h2>
        <div className="space-y-3">
          {activities.slice(2).map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index + 2} />
          ))}
        </div>
      </div>

      {/* Empty State Helper */}
      <div className="mt-8 p-6 rounded-2xl bg-muted/30 text-center">
        <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          This is where you'll see activity from people you follow and those nearby.
        </p>
      </div>
    </motion.div>
  );
}

function ActivityCard({ activity, index }: { activity: typeof activities[0]; index: number }) {
  const Icon = activity.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="tunely-card p-4 flex items-center gap-4"
    >
      {"avatar" in activity ? (
        <img
          src={activity.avatar}
          alt={activity.user}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {"user" in activity ? (
          <>
            <p className="font-medium text-foreground">
              <span className="font-semibold">{activity.user}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>
            </p>
            {"song" in activity && (
              <p className="text-sm text-primary font-medium mt-0.5">🎵 {activity.song}</p>
            )}
          </>
        ) : (
          <>
            <p className="font-semibold text-foreground">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.message}</p>
          </>
        )}
        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
      </div>
      
      {"user" in activity && activity.type === "follow" && (
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
          Follow
        </button>
      )}
    </motion.div>
  );
}
