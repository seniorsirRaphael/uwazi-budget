import { motion } from "framer-motion";
import { MapPin, Calendar, TrendingUp, Eye, Heart, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  title: string;
  county: string;
  ward?: string;
  sector: string;
  budget: number;
  spent: number;
  status: "on-track" | "delayed" | "at-risk" | "completed";
  startDate: string;
  endDate: string;
  image: string;
  contractor?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
  compact?: boolean;
}

const statusConfig = {
  "on-track": { label: "On Track", color: "bg-success text-white" },
  "delayed": { label: "Delayed", color: "bg-warning text-kenya-black" },
  "at-risk": { label: "At Risk", color: "bg-critical text-white" },
  "completed": { label: "Completed", color: "bg-trust text-white" },
};

export function ProjectCard({ project, delay = 0, compact = false }: ProjectCardProps) {
  const progress = Math.round((project.spent / project.budget) * 100);
  const status = statusConfig[project.status];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `KES ${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `KES ${(amount / 1000000).toFixed(1)}M`;
    }
    return `KES ${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden", compact ? "h-28 sm:h-32" : "h-32 sm:h-40")}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <span className={cn(
          "absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full",
          status.color
        )}>
          {status.label}
        </span>
        
        {/* Sector Badge */}
        <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 text-kenya-black text-[10px] sm:text-xs font-medium rounded-full">
          {project.sector}
        </span>
      </div>

      {/* Content */}
      <div className={cn("p-3 sm:p-4 space-y-3 sm:space-y-4", compact && "p-3 space-y-2")}>
        <div>
          <h3 className={cn(
            "font-display font-semibold text-foreground line-clamp-2 mb-1.5 sm:mb-2",
            compact ? "text-sm" : "text-sm sm:text-base"
          )}>
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{project.county}{project.ward && `, ${project.ward}`}</span>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Budget Utilization</span>
            <span className="font-mono font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: delay + 0.2 }}
              className={cn(
                "h-full rounded-full",
                progress < 50 ? "bg-success" : progress < 80 ? "bg-warning" : "bg-critical"
              )}
            />
          </div>
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Spent: {formatCurrency(project.spent)}</span>
            <span>Budget: {formatCurrency(project.budget)}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>{project.startDate} - {project.endDate}</span>
        </div>

        {/* Actions */}
        {!compact && (
          <div className="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1 gap-1.5 sm:gap-2 text-xs h-8 sm:h-9">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">View</span> Details
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
