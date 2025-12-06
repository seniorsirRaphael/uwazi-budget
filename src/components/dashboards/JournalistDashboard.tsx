import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Search,
  Download,
  Bell,
  TrendingUp,
  AlertTriangle,
  FileText,
  ArrowRight,
  Eye,
  Bookmark,
  Share2,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { User } from "@/contexts/AuthContext";

interface Props {
  user: User;
}

const ANOMALIES = [
  {
    id: "1",
    title: "Nakuru Road Project Overspend",
    description: "23% budget overrun detected in Phase 2 construction",
    severity: "high",
    county: "Nakuru",
    amount: "KES 45.2M",
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Unusual Procurement Pattern",
    description: "Same contractor awarded 5 projects in Kiambu within 30 days",
    severity: "medium",
    county: "Kiambu",
    date: "5 hours ago",
  },
  {
    id: "3",
    title: "Delayed Fund Disbursement",
    description: "Education funds for 12 schools unreleased for 6 months",
    severity: "high",
    county: "Mombasa",
    amount: "KES 120M",
    date: "1 day ago",
  },
];

const SAVED_SEARCHES = [
  { id: "1", name: "Health sector overspending", results: 23 },
  { id: "2", name: "Infrastructure delays > 3 months", results: 45 },
  { id: "3", name: "Single-source procurement", results: 12 },
];

export default function JournalistDashboard({ user }: Props) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-trust/10 via-primary/10 to-warning/10 rounded-3xl p-8 border border-border"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-trust/20 flex items-center justify-center">
            <Newspaper className="w-8 h-8 text-trust" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Welcome, {user.name}
            </h1>
            <p className="text-muted-foreground">Investigative Reporter • Data Journalism Hub</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Access comprehensive budget data, spot anomalies, and build data-driven stories.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Anomalies"
            value="47"
            subtitle="Requiring investigation"
            icon={AlertTriangle}
            variant="critical"
            delay={0}
          />
          <StatCard
            title="Saved Searches"
            value="12"
            subtitle="With new results"
            icon={Search}
            variant="primary"
            delay={0.1}
          />
          <StatCard
            title="Exports This Month"
            value="34"
            subtitle="Data downloads"
            icon={Download}
            variant="success"
            delay={0.2}
          />
          <StatCard
            title="Story Alerts"
            value="8"
            subtitle="New findings today"
            icon={Bell}
            variant="warning"
            delay={0.3}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Anomalies */}
        <div className="lg:col-span-2 space-y-6">
          {/* High Priority Anomalies */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-critical" />
                High Priority Anomalies
              </h3>
              <Link to="/alerts">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {ANOMALIES.map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-xl border-l-4 border-critical hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          anomaly.severity === "high" 
                            ? "bg-critical/20 text-critical" 
                            : "bg-warning/20 text-warning"
                        }`}>
                          {anomaly.severity}
                        </span>
                        <span className="text-xs text-muted-foreground">{anomaly.county}</span>
                      </div>
                      <h4 className="font-semibold text-foreground">{anomaly.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{anomaly.description}</p>
                      {anomaly.amount && (
                        <p className="text-sm font-mono text-critical mt-2">{anomaly.amount}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{anomaly.date}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="iconSm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="iconSm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="iconSm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data Export Tools */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-trust" />
              Quick Data Export
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Budget Summary", format: "CSV" },
                { label: "Project List", format: "Excel" },
                { label: "Anomaly Report", format: "PDF" },
                { label: "County Comparison", format: "JSON" },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  className="h-auto py-4 flex-col gap-1"
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.format}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Saved Searches */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-primary" />
              Saved Searches
            </h3>
            <div className="space-y-3">
              {SAVED_SEARCHES.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground">{search.name}</span>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded">
                    {search.results} new
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2">
              <Search className="w-4 h-4" />
              New Search
            </Button>
          </div>

          {/* Story Ideas */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-warning" />
              Story Ideas
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-critical/10 border border-critical/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">
                  3 counties show similar spending patterns
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Possible coordinated misuse detected
                </p>
              </div>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">
                  Education budget utilization dropping
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  15% decrease compared to last quarter
                </p>
              </div>
            </div>
          </div>

          {/* Quick Analysis */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-success" />
              Quick Analysis
            </h3>
            <div className="space-y-4">
              <Link to="/national-budget">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Budget Trends
                </Button>
              </Link>
              <Link to="/county-budget">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart3 className="w-4 h-4" />
                  County Comparison
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
