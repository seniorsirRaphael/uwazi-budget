import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "primary" | "success" | "warning" | "critical";
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
    critical: "bg-critical/5 border-critical/20",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    critical: "bg-critical/10 text-critical",
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return TrendingUp;
    if (trend.value < 0) return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground truncate">{value}</p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
          {trend && TrendIcon && (
            <div className={cn(
              "flex items-center gap-1 text-xs sm:text-sm font-medium flex-wrap",
              trend.value > 0 ? "text-success" : trend.value < 0 ? "text-critical" : "text-muted-foreground"
            )}>
              <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground font-normal hidden sm:inline">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl flex-shrink-0",
          iconStyles[variant]
        )}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </div>
      </div>
    </motion.div>
  );
}
