import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

interface Ad {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  sponsored: boolean;
}

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/30"
    >
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-medium text-muted-foreground">
        <Sparkles className="w-3 h-3 text-secondary" />
        Sponsored
      </div>
      
      <div className="flex items-center gap-4 p-4 pt-12">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-20 h-20 rounded-xl object-cover shadow-lg"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{ad.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {ad.description}
          </p>
          <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            {ad.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
