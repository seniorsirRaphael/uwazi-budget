import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  MapPin,
  Heart,
  Bell,
  FileText,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaxCalculator } from "@/components/dashboard/TaxCalculator";
import { User as UserType } from "@/contexts/AuthContext";

interface Props {
  user: UserType;
}

const FOLLOWED_PROJECTS = [
  {
    id: "1",
    title: "Nakuru Water Treatment Plant",
    status: "on-track",
    progress: 75,
    lastUpdate: "2 days ago",
  },
  {
    id: "2",
    title: "Kisumu Primary School Renovation",
    status: "delayed",
    progress: 45,
    lastUpdate: "1 week ago",
  },
  {
    id: "3",
    title: "Nairobi Hospital Extension",
    status: "on-track",
    progress: 60,
    lastUpdate: "3 days ago",
  },
];

const SUBMITTED_REPORTS = [
  {
    id: "1",
    title: "Road construction quality concerns",
    status: "reviewed",
    date: "Nov 15, 2024",
  },
  {
    id: "2",
    title: "Delayed school supplies delivery",
    status: "pending",
    date: "Nov 20, 2024",
  },
];

export default function CitizenDashboard({ user }: Props) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 via-success/10 to-trust/10 rounded-3xl p-8 border border-border"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Welcome, {user.name}!
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Nairobi County • Westlands Ward
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Track your tax contributions and see how they're being used in your community.
        </p>
      </motion.div>

      {/* Your Tax Impact */}
      <section>
        <h2 className="font-display font-bold text-xl text-foreground mb-4">
          Your Tax Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Monthly PAYE"
            value="KES 4,200"
            subtitle="Estimated contribution"
            icon={TrendingUp}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Annual Total"
            value="KES 50,400"
            subtitle="Your yearly contribution"
            icon={TrendingUp}
            variant="success"
            delay={0.1}
          />
          <StatCard
            title="Projects Funded"
            value="12"
            subtitle="In your ward"
            icon={Heart}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Reports Submitted"
            value="2"
            subtitle="Active verifications"
            icon={FileText}
            variant="critical"
            delay={0.3}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Followed Projects */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-critical" />
                Followed Projects
              </h3>
              <Link to="/project-tracker">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {FOLLOWED_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    project.status === "on-track" ? "bg-success/20" : "bg-warning/20"
                  }`}>
                    {project.status === "on-track" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{project.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Updated {project.lastUpdate}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-foreground">{project.progress}%</p>
                    <div className="w-20 h-1.5 bg-muted rounded-full mt-1">
                      <div
                        className={`h-full rounded-full ${
                          project.status === "on-track" ? "bg-success" : "bg-warning"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submitted Reports */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-trust" />
                Your Reports
              </h3>
              <Link to="/report">
                <Button variant="outline" size="sm" className="gap-2">
                  Submit Report
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {SUBMITTED_REPORTS.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-foreground">{report.title}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    report.status === "reviewed" 
                      ? "bg-success/20 text-success" 
                      : "bg-warning/20 text-warning"
                  }`}>
                    {report.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TaxCalculator />
          
          {/* Ward Budget News */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-warning" />
              Ward Updates
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">New health center approved</p>
                <p className="text-xs text-muted-foreground mt-1">KES 25M allocated for Westlands</p>
              </div>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">Road repairs starting</p>
                <p className="text-xs text-muted-foreground mt-1">Waiyaki Way improvements begin next month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
