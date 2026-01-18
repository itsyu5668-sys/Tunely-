# Tunely - Location-Based Music Discovery App

## Overview

Tunely is a mobile-first React application that enables users to discover music based on location. Users can see what songs people nearby are listening to, connect with local music lovers, and find new tracks through a map-based or feed-based interface. The app features Spotify integration for music data, user profiles with privacy controls, a "buzz" social interaction system, and premium subscription features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for fast development
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming (dark/light mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **State Management**: React Query (@tanstack/react-query) for server state, React Context for app-wide state (Premium features)
- **Routing**: React Router DOM for client-side navigation
- **Animations**: Framer Motion for smooth UI transitions and interactions
- **Maps**: MapLibre GL / Mapbox GL for interactive map visualization

### Key Design Patterns
- Component-based architecture with reusable UI components in `src/components/ui/`
- Feature components organized by function (auth, map, feed, profile)
- Custom hooks for shared logic (`use-mobile`, `use-toast`)
- Context providers for cross-cutting concerns (`PremiumContext`)
- Path aliases configured (`@/` maps to `src/`)

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Located in `shared/schema.ts`
- **Migrations**: Output to `./migrations` directory
- **Database URL**: Retrieved from `DATABASE_URL` environment variable

### Authentication Flow
- Multi-step auth: email/password or Google → Spotify OAuth connection
- Currently uses mock/simulated authentication (placeholder for real implementation)

### Premium/Monetization System
- Free tier with limited "buzzes" (3 per day)
- Premium tier with unlimited buzzes and additional features
- Managed through `PremiumContext`

## External Dependencies

### Third-Party Services
- **Spotify**: OAuth integration for music data and user authentication (to be implemented)
- **Mapbox/MapLibre**: Map rendering and geolocation features
- **Google Auth**: Social sign-in option (to be implemented)

### Key NPM Packages
- `react-map-gl` / `mapbox-gl` / `maplibre-gl`: Map visualization
- `framer-motion`: Animation library
- `@tanstack/react-query`: Data fetching and caching
- `react-hook-form` with `@hookform/resolvers`: Form handling
- `zod`: Schema validation
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `vaul`: Drawer component
- `embla-carousel-react`: Carousel functionality
- `date-fns`: Date manipulation
- `sonner`: Toast notifications

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- Mapbox access token (for map features)
- Spotify API credentials (for music integration)