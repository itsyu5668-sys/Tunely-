import { motion } from "framer-motion";
import { NearbyUser, mockAds } from "@/data/mockUsers";
import { UserCard } from "./UserCard";
import { AdCard } from "./AdCard";

interface FeedViewProps {
  users: NearbyUser[];
  onUserSelect: (user: NearbyUser) => void;
  onFollow: (userId: string) => void;
}

export function FeedView({ users, onUserSelect, onFollow }: FeedViewProps) {
  // Insert ad after every 3 users
  const feedItems: Array<{ type: "user" | "ad"; data: NearbyUser | typeof mockAds[0] }> = [];
  
  users.forEach((user, index) => {
    feedItems.push({ type: "user", data: user });
    if ((index + 1) % 3 === 0 && mockAds[Math.floor(index / 3)]) {
      feedItems.push({ type: "ad", data: mockAds[Math.floor(index / 3)] });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 px-4 py-4 pb-24"
    >
      {feedItems.map((item, index) => {
        if (item.type === "ad") {
          return <AdCard key={`ad-${(item.data as typeof mockAds[0]).id}`} ad={item.data as typeof mockAds[0]} />;
        }
        return (
          <UserCard
            key={(item.data as NearbyUser).id}
            user={item.data as NearbyUser}
            onSelect={onUserSelect}
            onFollow={onFollow}
            index={index}
          />
        );
      })}
    </motion.div>
  );
}
