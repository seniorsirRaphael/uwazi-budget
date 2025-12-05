import { motion } from "framer-motion";
import { MapPin, ZoomIn, ZoomOut, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import kenyaMapImage from "@/assets/images/kenya-map.png";

interface KenyaMapProps {
  className?: string;
  onCountyClick?: (county: string) => void;
}

const COUNTY_HIGHLIGHTS = [
  { name: "Nairobi", x: 55, y: 68, budget: "KES 42.5B", projects: 156 },
  { name: "Mombasa", x: 75, y: 85, budget: "KES 18.2B", projects: 89 },
  { name: "Kisumu", x: 25, y: 58, budget: "KES 15.8B", projects: 72 },
  { name: "Nakuru", x: 42, y: 55, budget: "KES 22.1B", projects: 98 },
  { name: "Eldoret", x: 30, y: 42, budget: "KES 12.4B", projects: 65 },
];

export function KenyaMap({ className, onCountyClick }: KenyaMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-card border border-border rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          County Budget Map
        </h3>
        <p className="text-sm text-muted-foreground">
          Click a county for details
        </p>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="iconSm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="iconSm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="iconSm">
          <Layers className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Image */}
      <div className="relative h-96 p-8">
        <img
          src={kenyaMapImage}
          alt="Kenya County Map"
          className="w-full h-full object-contain"
        />
        
        {/* County Markers */}
        {COUNTY_HIGHLIGHTS.map((county, index) => (
          <motion.button
            key={county.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            onClick={() => onCountyClick?.(county.name)}
            style={{ left: `${county.x}%`, top: `${county.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="relative">
              <div className="w-4 h-4 bg-kenya-red rounded-full shadow-lg animate-pulse" />
              <div className="absolute -inset-2 bg-kenya-red/20 rounded-full animate-ping" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card border border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                  <p className="font-semibold text-foreground">{county.name}</p>
                  <p className="text-sm text-primary font-mono">{county.budget}</p>
                  <p className="text-xs text-muted-foreground">{county.projects} projects</p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <p className="text-xs font-semibold text-foreground mb-2">Budget per Capita</p>
        <div className="flex items-center gap-1">
          <div className="w-6 h-2 bg-success rounded" />
          <div className="w-6 h-2 bg-warning rounded" />
          <div className="w-6 h-2 bg-critical rounded" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </motion.div>
  );
}
