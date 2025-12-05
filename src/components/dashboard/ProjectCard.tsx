import { motion } from "framer-motion";
import { MapPin, Calendar, TrendingUp, Eye, Heart, Share2 } from "lucide-react";
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
}

const statusConfig = {
  "on-track": { label: "On Track", color: "bg-success text-white" },
  "delayed": { label: "Delayed", color: "bg-warning text-kenya-black" },
  "at-risk": { label: "At Risk", color: "bg-critical text-white" },
  "completed": { label: "Completed", color: "bg-trust text-white" },
};

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
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
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <span className={cn(
          "absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full",
          status.color
        )}>
          {status.label}
        </span>
        
        {/* Sector Badge */}
        <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 text-kenya-black text-xs font-medium rounded-full">
          {project.sector}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-display font-semibold text-foreground line-clamp-2 mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{project.county}{project.ward && `, ${project.ward}`}</span>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Budget Utilization</span>
            <span className="font-mono font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Spent: {formatCurrency(project.spent)}</span>
            <span>Budget: {formatCurrency(project.budget)}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{project.startDate} - {project.endDate}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </Button>
          <Button variant="ghost" size="iconSm">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="iconSm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
