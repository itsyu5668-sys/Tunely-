import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { RealMapView } from "@/components/RealMapView";
import { FeedView } from "@/components/FeedView";
import { UserProfileModal } from "@/components/UserProfileModal";
import { ProfilePage } from "@/components/ProfilePage";
import { DiscoverPage } from "@/components/DiscoverPage";
import { ActivityPage } from "@/components/ActivityPage";
import { AuthPage } from "@/components/auth/AuthPage";
import { mockUsers, NearbyUser } from "@/data/mockUsers";
import { PremiumProvider } from "@/contexts/PremiumContext";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("map");
  const [viewMode, setViewMode] = useState<"map" | "feed">("map");
  const [selectedUser, setSelectedUser] = useState<NearbyUser | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState({
    invisible: false,
    hideSong: false,
    hideLocation: false,
  });

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleFollow = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
    if (selectedUser?.id === userId) {
      setSelectedUser((prev) =>
        prev ? { ...prev, isFollowing: !prev.isFollowing } : null
      );
    }
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <PremiumProvider>
        <AuthPage onAuthComplete={() => setIsAuthenticated(true)} />
      </PremiumProvider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "map":
        return (
          <>
            <Header
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {viewMode === "map" ? (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <RealMapView users={users} onUserSelect={setSelectedUser} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="feed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full overflow-y-auto scrollbar-hide"
                  >
                    <FeedView
                      users={users}
                      onUserSelect={setSelectedUser}
                      onFollow={handleFollow}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        );
      case "discover":
        return (
          <>
            <Header
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <DiscoverPage />
            </div>
          </>
        );
      case "activity":
        return (
          <>
            <Header
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <ActivityPage />
            </div>
          </>
        );
      case "profile":
        return (
          <>
            <Header
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <ProfilePage privacy={privacy} onPrivacyChange={handlePrivacyChange} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PremiumProvider>
      <div className="flex flex-col h-screen bg-background max-w-md mx-auto shadow-2xl relative overflow-hidden">
        {renderContent()}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onFollow={handleFollow}
        />
      </div>
    </PremiumProvider>
  );
};

export default Index;
