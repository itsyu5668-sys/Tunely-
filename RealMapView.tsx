import { useRef, useCallback, useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { motion, AnimatePresence } from "framer-motion";
import { NearbyUser } from "@/data/mockUsers";
import { Locate } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

interface RealMapViewProps {
  users: NearbyUser[];
  onUserSelect: (user: NearbyUser) => void;
}

// Generate random coordinates around a center point
const generateUserCoordinates = (users: NearbyUser[], center: { lat: number; lng: number }) => {
  return users.map((user, index) => {
    // Spread users globally if zoom is low, or keep them nearby if high
    const angle = (index / users.length) * 2 * Math.PI;
    const isGlobal = index % 2 === 0; // Simulate some global users
    const distance = isGlobal ? 10 + Math.random() * 50 : 0.003 + Math.random() * 0.008;
    // Calculate direction from center (for orientation-based animation)
    const direction = {
      north: Math.cos(angle) > 0.5,
      south: Math.cos(angle) < -0.5,
      east: Math.sin(angle) > 0.5,
      west: Math.sin(angle) < -0.5,
    };
    return {
      ...user,
      coordinates: {
        lat: center.lat + distance * Math.cos(angle),
        lng: center.lng + distance * Math.sin(angle),
      },
      direction,
    };
  });
};

interface DeviceOrientation {
  alpha: number; // Z-axis rotation (compass direction)
  beta: number;  // X-axis rotation (front-back tilt)
  gamma: number; // Y-axis rotation (left-right tilt)
}

export function RealMapView({ users, onUserSelect }: RealMapViewProps) {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 3,
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [usersWithCoords, setUsersWithCoords] = useState<(NearbyUser & { 
    coordinates: { lat: number; lng: number };
    direction: { north: boolean; south: boolean; east: boolean; west: boolean };
  })[]>([]);

  // Debug: Monitor usersWithCoords
  useEffect(() => {
    console.log("Users with coordinates updated:", usersWithCoords.length);
  }, [usersWithCoords]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [orientation, setOrientation] = useState<DeviceOrientation>({ alpha: 0, beta: 0, gamma: 0 });
  const [hasOrientationSupport, setHasOrientationSupport] = useState(false);

  // Device orientation listener
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
      setHasOrientationSupport(true);
    };

    // Request permission on iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Calculate scale based on device orientation
  const getScaleForDirection = (direction: { north: boolean; south: boolean; east: boolean; west: boolean }) => {
    if (!hasOrientationSupport) return 1;
    
    const { beta, gamma } = orientation;
    let scale = 1;
    
    // Beta: tilting phone forward (negative) = looking north, backward (positive) = looking south
    // Gamma: tilting phone left (negative) = looking west, right (positive) = looking east
    
    if (direction.north && beta < -10) {
      scale = 1 + Math.min(Math.abs(beta) / 45, 0.5);
    } else if (direction.south && beta > 30) {
      scale = 1 + Math.min((beta - 30) / 45, 0.5);
    }
    
    if (direction.east && gamma > 15) {
      scale = Math.max(scale, 1 + Math.min(gamma / 45, 0.4));
    } else if (direction.west && gamma < -15) {
      scale = Math.max(scale, 1 + Math.min(Math.abs(gamma) / 45, 0.4));
    }
    
    return scale;
  };

  useEffect(() => {
    // Generate initial set of users with coordinates
    const initialCoords = generateUserCoordinates(users, { lat: 40.7128, lng: -74.006 });
    setUsersWithCoords(initialCoords);
    setMapLoaded(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setViewState((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
          setUsersWithCoords(generateUserCoordinates(users, { lat: latitude, lng: longitude }));
        },
        (error) => {
          console.warn("Geolocation failed:", error);
        }
      );
    }
  }, [users]);

  const handleLocate = useCallback(() => {
    if (userLocation) {
      setViewState((prev) => ({
        ...prev,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        zoom: 15,
      }));
    }
  }, [userLocation]);

  return (
    <div className="relative w-full h-full bg-neutral-900">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        {/* User's location marker - Clean green pin like the reference */}
        {userLocation && (
          <Marker
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="center"
          >
            <div className="relative flex flex-col items-center">
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-12 h-12 bg-primary/40 rounded-full"
              />
              {/* Center pin */}
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg relative z-10 border-4 border-primary/30">
                <div className="w-4 h-4 bg-primary-foreground rounded-full" />
              </div>
              <span className="mt-2 text-xs font-bold text-primary tracking-widest uppercase">
                YOU
              </span>
            </div>
          </Marker>
        )}

        {/* Other users */}
        <AnimatePresence>
          {mapLoaded && usersWithCoords.map((user, index) => {
            const orientationScale = getScaleForDirection(user.direction);
            
            return (
              <Marker
                key={user.id}
                latitude={user.coordinates.lat}
                longitude={user.coordinates.lng}
                anchor="center"
              >
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: orientationScale, 
                    opacity: 1,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    delay: index * 0.08, 
                    type: "spring", 
                    damping: 20,
                    scale: { duration: 0.3 }
                  }}
                  onClick={() => onUserSelect(user)}
                  className="relative group cursor-pointer flex flex-col items-center"
                >
                  {/* Avatar with thick green ring */}
                  <div className="relative">
                    {/* Outer glow ring for online users */}
                    {user.isOnline && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="absolute -inset-2 bg-primary/30 rounded-full"
                      />
                    )}
                    
                    {/* Main avatar container with thick green border */}
                    <div className={`relative p-1 rounded-full ${
                      user.isOnline 
                        ? 'bg-gradient-to-br from-primary via-primary to-primary/80' 
                        : 'bg-border'
                    }`}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-background transition-transform group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Online indicator dot */}
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
                    )}
                  </div>

                  {/* Distance label */}
                  <div className="mt-2 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/50">
                    <span className="text-xs font-semibold text-foreground">
                      {user.distance}
                    </span>
                  </div>
                </motion.button>
              </Marker>
            );
          })}
        </AnimatePresence>
      </Map>

      {/* Locate button - bottom right like Google Maps */}
      <button
        onClick={handleLocate}
        className="absolute right-4 bottom-24 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <Locate className="w-5 h-5 text-gray-700" />
      </button>

      {/* Info overlay with Google-style card */}
      <div className="absolute left-4 bottom-24 bg-white rounded-lg px-4 py-2 shadow-lg">
        <p className="text-sm text-gray-600">
          <span className="text-primary font-bold">{usersWithCoords.length}</span> listening nearby
        </p>
      </div>
    </div>
  );
}
