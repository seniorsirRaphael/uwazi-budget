import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info" | "success";
  county?: string;
  sector?: string;
  timestamp: string;
  amount?: string;
}

interface AlertCardProps {
  alert: Alert;
  delay?: number;
}

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    bgColor: "bg-critical/5",
    borderColor: "border-critical/20",
    iconBg: "bg-critical/10",
    iconColor: "text-critical",
    badge: "bg-critical/10 text-critical",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-warning/5",
    borderColor: "border-warning/20",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    badge: "bg-warning/10 text-warning",
  },
  info: {
    icon: AlertCircle,
    bgColor: "bg-trust/5",
    borderColor: "border-trust/20",
    iconBg: "bg-trust/10",
    iconColor: "text-trust",
    badge: "bg-trust/10 text-trust",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-success/5",
    borderColor: "border-success/20",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    badge: "bg-success/10 text-success",
  },
};

export function AlertCard({ alert, delay = 0 }: AlertCardProps) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer group",
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex gap-4">
        <div className={cn("p-2 rounded-lg h-fit", config.iconBg)}>
          <Icon className={cn("w-5 h-5", config.iconColor)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-foreground truncate">{alert.title}</h4>
            <span className={cn(
              "px-2 py-0.5 text-xs font-medium rounded-full capitalize flex-shrink-0",
              config.badge
            )}>
              {alert.severity}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {alert.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {alert.county && (
                <span className="bg-muted px-2 py-0.5 rounded">{alert.county}</span>
              )}
              {alert.sector && (
                <span className="bg-muted px-2 py-0.5 rounded">{alert.sector}</span>
              )}
              {alert.amount && (
                <span className="font-mono font-medium text-foreground">{alert.amount}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{alert.timestamp}</span>
            </div>
          </div>
        </div>
        
        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
      </div>
    </motion.div>
  );
}

export function AlertList({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <AlertCard key={alert.id} alert={alert} delay={index * 0.1} />
      ))}
    </div>
  );
}
