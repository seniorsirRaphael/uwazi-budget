import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { BudgetChart } from "@/components/dashboard/BudgetChart";
import { User } from "@/contexts/AuthContext";

interface Props {
  user: User;
}

const CONSTITUENCY_PROJECTS = [
  {
    id: "1",
    title: "Primary School Renovation",
    status: "on-track",
    budget: "KES 25M",
    progress: 78,
    deadline: "Mar 2025",
  },
  {
    id: "2",
    title: "Water Pipeline Extension",
    status: "delayed",
    budget: "KES 45M",
    progress: 35,
    deadline: "Jun 2025",
  },
  {
    id: "3",
    title: "Health Center Equipment",
    status: "on-track",
    budget: "KES 12M",
    progress: 90,
    deadline: "Dec 2024",
  },
];

const CITIZEN_QUERIES = [
  {
    id: "1",
    subject: "Road repair timeline inquiry",
    status: "pending",
    date: "Nov 28, 2024",
  },
  {
    id: "2",
    subject: "School funding allocation",
    status: "responded",
    date: "Nov 25, 2024",
  },
  {
    id: "3",
    subject: "Water project delays",
    status: "pending",
    date: "Nov 22, 2024",
  },
];

const UPCOMING_MEETINGS = [
  {
    id: "1",
    title: "Budget Review Committee",
    date: "Dec 5, 2024",
    time: "10:00 AM",
  },
  {
    id: "2",
    title: "Public Participation Forum",
    date: "Dec 12, 2024",
    time: "2:00 PM",
  },
];

export default function OfficialDashboard({ user }: Props) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-warning/10 via-primary/10 to-success/10 rounded-3xl p-8 border border-border"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-warning" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Welcome, Hon. {user.name}
            </h1>
            <p className="text-muted-foreground">Ward Representative • Westlands Ward, Nairobi</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Monitor constituency performance, manage citizen queries, and prepare for budget hearings.
        </p>
      </motion.div>

      {/* Performance Overview */}
      <section>
        <h2 className="font-display font-bold text-xl text-foreground mb-4">
          Constituency Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Budget"
            value="KES 82M"
            subtitle="FY 2024/25 allocation"
            icon={TrendingUp}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Utilization Rate"
            value="67%"
            subtitle="Budget spent"
            icon={Target}
            trend={{ value: 12, label: "vs target" }}
            variant="success"
            delay={0.1}
          />
          <StatCard
            title="Active Projects"
            value="8"
            subtitle="In progress"
            icon={BarChart3}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Citizen Queries"
            value="12"
            subtitle="Pending response"
            icon={MessageSquare}
            variant="critical"
            delay={0.3}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Status */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Constituency Projects
              </h3>
              <Link to="/project-tracker">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {CONSTITUENCY_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Budget: {project.budget} • Deadline: {project.deadline}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === "on-track" 
                        ? "bg-success/20 text-success" 
                        : "bg-warning/20 text-warning"
                    }`}>
                      {project.status === "on-track" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          On Track
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Delayed
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          project.status === "on-track" ? "bg-success" : "bg-warning"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Citizen Queries */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-trust" />
                Citizen Queries
              </h3>
              <Button variant="outline" size="sm">
                View Inbox
              </Button>
            </div>
            <div className="space-y-3">
              {CITIZEN_QUERIES.map((query, index) => (
                <motion.div
                  key={query.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-foreground">{query.subject}</p>
                    <p className="text-sm text-muted-foreground">{query.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    query.status === "responded" 
                      ? "bg-success/20 text-success" 
                      : "bg-warning/20 text-warning"
                  }`}>
                    {query.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <BudgetChart />
          
          {/* Upcoming Meetings */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-warning" />
              Upcoming Meetings
            </h3>
            <div className="space-y-3">
              {UPCOMING_MEETINGS.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-3 bg-muted/50 rounded-lg"
                >
                  <p className="font-medium text-foreground">{meeting.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {meeting.date}
                    <Clock className="w-3 h-3 ml-2" />
                    {meeting.time}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2">
              <FileText className="w-4 h-4" />
              Prepare Meeting Brief
            </Button>
          </div>

          {/* Compliance */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-success" />
              Compliance Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm text-foreground">Quarterly Reports</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm text-foreground">Budget Disclosure</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <span className="text-sm text-foreground">Project Updates</span>
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
