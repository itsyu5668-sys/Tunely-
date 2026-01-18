import { motion } from "framer-motion";
import { TrendingUp, Headphones, Globe, Zap } from "lucide-react";

const trendingGenres = [
  { name: "Pop", color: "from-pink-500 to-rose-500", count: "2.4M" },
  { name: "Hip-Hop", color: "from-purple-500 to-violet-500", count: "1.8M" },
  { name: "Indie", color: "from-green-500 to-emerald-500", count: "1.2M" },
  { name: "Electronic", color: "from-blue-500 to-cyan-500", count: "980K" },
];

const topSongs = [
  { title: "Flowers", artist: "Miley Cyrus", plays: "1.2B", rank: 1 },
  { title: "Kill Bill", artist: "SZA", plays: "890M", rank: 2 },
  { title: "Calm Down", artist: "Rema", plays: "780M", rank: 3 },
];

export function DiscoverPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6 pb-24 space-y-6"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Trending Now</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Discover Music</h1>
          <p className="text-muted-foreground mt-1">See what's popular in your area</p>
        </div>
      </div>

      {/* Trending Genres */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending Genres
          </h2>
          <button className="text-sm text-primary font-medium">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trendingGenres.map((genre, index) => (
            <motion.button
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${genre.color} text-white`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative text-left">
                <h3 className="font-bold text-lg">{genre.name}</h3>
                <p className="text-sm opacity-80">{genre.count} listeners</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Top Songs Near You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Headphones className="w-5 h-5 text-primary" />
            Top Songs Near You
          </h2>
        </div>
        <div className="tunely-card divide-y divide-border">
          {topSongs.map((song, index) => (
            <motion.div
              key={song.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                {song.rank}
              </span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{song.title}</p>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
              </div>
              <span className="text-sm text-muted-foreground">{song.plays}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Trends */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Global Trends
          </h2>
        </div>
        <div className="tunely-card p-4">
          <p className="text-muted-foreground text-center py-8">
            Connect Spotify to see personalized global trends
          </p>
        </div>
      </section>
    </motion.div>
  );
}
