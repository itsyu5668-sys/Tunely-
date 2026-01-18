export interface NearbyUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  distance: string;
  distanceValue: number;
  song: {
    title: string;
    artist: string;
    albumArt: string;
    reactions?: Record<string, number>;
    spotifyUrl?: string;
  };
  isPlaying: boolean;
  genres: string[];
  followers: number;
  isFollowing: boolean;
  bio: string;
  isOnline: boolean;
  location: {
    x: number;
    y: number;
  };
  tasteMatch: number; // Percentage 0-100
  isPremium?: boolean;
  receivedBuzzes?: { type: string; from: string; timestamp: Date }[];
}

// Current user's genres for taste matching
export const currentUserGenres = ["Pop", "Indie", "Electronic", "R&B"];

export const mockUsers: NearbyUser[] = [
  {
    id: "1",
    name: "Alex Rivera",
    username: "@alexr",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    distance: "0.3 mi",
    distanceValue: 0.3,
    song: {
      title: "Blinding Lights",
      artist: "The Weeknd",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273e9849cd1a2e1dce0ce0f8618",
      reactions: { "🔥": 12, "❤️": 8 },
      spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZvYvSTC3p3R0"
    },
    isPlaying: true,
    genres: ["Pop", "R&B", "Synth-pop"],
    followers: 234,
    isFollowing: false,
    bio: "Music is life 🎵 Always discovering new sounds",
    isOnline: true,
    location: { x: 35, y: 25 },
    tasteMatch: 85,
    isPremium: true
  },
  {
    id: "2",
    name: "Maya Chen",
    username: "@mayabeats",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    distance: "0.5 mi",
    distanceValue: 0.5,
    song: {
      title: "Levitating",
      artist: "Dua Lipa",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be",
      reactions: { "🎵": 5, "💯": 3 }
    },
    isPlaying: true,
    genres: ["Dance", "Pop", "Electronic"],
    followers: 892,
    isFollowing: true,
    bio: "DJ by night 🎧 Coffee addict by day",
    isOnline: true,
    location: { x: 65, y: 40 },
    tasteMatch: 92,
    isPremium: false
  },
  {
    id: "3",
    name: "Jordan Taylor",
    username: "@jtunes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    distance: "0.8 mi",
    distanceValue: 0.8,
    song: {
      title: "Bad Guy",
      artist: "Billie Eilish",
      albumArt: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
      reactions: { "🔥": 7 }
    },
    isPlaying: true,
    genres: ["Alt Pop", "Indie", "Electronic"],
    followers: 456,
    isFollowing: false,
    bio: "Finding hidden gems in every genre",
    isOnline: false,
    location: { x: 20, y: 55 },
    tasteMatch: 78,
    isPremium: false
  },
  {
    id: "4",
    name: "Sam Wilson",
    username: "@samwaves",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    distance: "1.2 mi",
    distanceValue: 1.2,
    song: {
      title: "Heat Waves",
      artist: "Glass Animals",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464",
      reactions: { "❤️": 15, "🙌": 4 }
    },
    isPlaying: true,
    genres: ["Indie", "Psychedelic", "Electronic"],
    followers: 1203,
    isFollowing: true,
    bio: "Vibes only ✨ Playlist curator",
    isOnline: true,
    location: { x: 75, y: 70 },
    tasteMatch: 67,
    isPremium: true
  },
  {
    id: "5",
    name: "Emma Davis",
    username: "@emmad",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    distance: "1.5 mi",
    distanceValue: 1.5,
    song: {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
      reactions: { "❤️": 23, "🔥": 11 }
    },
    isPlaying: true,
    genres: ["Pop", "Country", "Indie Folk"],
    followers: 3421,
    isFollowing: false,
    bio: "Swiftie forever 💕 Live music enthusiast",
    isOnline: true,
    location: { x: 45, y: 80 },
    tasteMatch: 55,
    isPremium: false
  },
  {
    id: "6",
    name: "Chris Park",
    username: "@chrisbeats",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    distance: "2.1 mi",
    distanceValue: 2.1,
    song: {
      title: "Starboy",
      artist: "The Weeknd",
      albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
      reactions: { "🔥": 9 }
    },
    isPlaying: false,
    genres: ["Hip-Hop", "R&B", "Pop"],
    followers: 567,
    isFollowing: false,
    bio: "Producer | Beat maker | Music lover",
    isOnline: false,
    location: { x: 55, y: 35 },
    tasteMatch: 72,
    isPremium: false
  }
];

export const mockAds = [
  {
    id: "ad1",
    type: "spotify-playlist",
    title: "Discover Weekly",
    description: "Your personalized playlist. Updated every Monday.",
    image: "https://i.scdn.co/image/ab67706f00000003ba77a2166a7b66e9bfc80e57",
    cta: "Listen Now",
    sponsored: true
  },
  {
    id: "ad2",
    type: "premium",
    title: "Go Premium",
    description: "Ad-free music, offline listening, and more.",
    image: "https://i.scdn.co/image/ab67616d0000b273e9849cd1a2e1dce0ce0f8618",
    cta: "Try Free",
    sponsored: true
  }
];
