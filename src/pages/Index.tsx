import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  FolderKanban,
  Bell,
  ShieldCheck,
  Users,
  BarChart3,
  Eye,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaxCalculator } from "@/components/dashboard/TaxCalculator";
import { BudgetChart } from "@/components/dashboard/BudgetChart";
import { AlertCard, Alert } from "@/components/dashboard/AlertCard";
import { ProjectCard, Project } from "@/components/dashboard/ProjectCard";
import { KenyaMap } from "@/components/dashboard/KenyaMap";
import heroBg from "@/assets/images/hero-bg.jpg";
import kiambutechnical from "@/assets/images/kiambutechnical.jpg";
import kisumuprimary from "@/assets/images/kisumuprimary.jpg";
import mombasaphase2 from "@/assets/images/mombasaphase2.jpg";

const RECENT_ALERTS: Alert[] = [
  {
    id: "1",
    title: "Budget Overrun Detected",
    description: "Nakuru County road project has exceeded allocated budget by 23%. Immediate review recommended.",
    severity: "critical",
    county: "Nakuru",
    sector: "Infrastructure",
    amount: "KES 45.2M",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Project Milestone Delayed",
    description: "Kisumu health center construction is 3 months behind schedule. Contractor cited supply chain issues.",
    severity: "warning",
    county: "Kisumu",
    sector: "Health",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "Successful Project Completion",
    description: "Mombasa water treatment plant completed on time and under budget. Serving 50,000 residents.",
    severity: "success",
    county: "Mombasa",
    sector: "Water",
    amount: "KES 120M",
    timestamp: "1 day ago",
  },
];

const FEATURED_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Kenyatta Memorial Hospital Extension - New Maternity Wing",
    county: "Nairobi",
    ward: "Westlands",
    sector: "Health",
    budget: 450000000,
    spent: 312000000,
    status: "on-track",
    startDate: "Jan 2024",
    endDate: "Dec 2025",
    image: kiambutechnical,
    contractor: "Kenya Medical Infrastructure Ltd",
  },
  {
    id: "2",
    title: "Kisumu Primary School Renovation Program",
    county: "Kisumu",
    ward: "Central",
    sector: "Education",
    budget: 85000000,
    spent: 78000000,
    status: "delayed",
    startDate: "Mar 2024",
    endDate: "Aug 2025",
    image: kisumuprimary,
    contractor: "East Africa Builders",
  },
  {
    id: "3",
    title: "Mombasa-Malindi Highway Expansion Phase 2",
    county: "Mombasa",
    sector: "Infrastructure",
    budget: 2500000000,
    spent: 2100000000,
    status: "at-risk",
    startDate: "Jun 2023",
    endDate: "Dec 2025",
    image: mombasaphase2,
    contractor: "China Roads & Bridges Corp",
  },
];

const IMPACT_STATS = [
  { value: "KES 2.3B", label: "Savings Identified", icon: Sparkles },
  { value: "847", label: "Issues Reported", icon: Bell },
  { value: "156K", label: "Active Users", icon: Users },
  { value: "47", label: "Counties Covered", icon: Globe },
];

export default function Index() {
  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Hero Section */}
      <section className="relative -mx-3 sm:-mx-4 -mt-3 sm:-mt-4 lg:-mx-6 lg:-mt-6 overflow-hidden">
        <div className="relative min-h-[500px] sm:min-h-[550px] lg:min-h-[650px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt="Kenya cityscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Kenya Stripe Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-kenya-black via-kenya-red via-50% to-kenya-green" />

          {/* Content */}
          <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
            <div className="max-w-3xl space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kenya-green" />
                  Government Budget Transparency Portal
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
              >
                Uwazi Budget
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl text-kenya-green font-display font-semibold"
              >
                See Every Shilling, Build Our Nation
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl"
              >
                Track how your tax money flows from the National Treasury to local projects. 
                Real-time visibility into government spending across all 47 counties.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                <Link to="/national-budget" className="w-full sm:w-auto">
                  <Button variant="hero" className="gap-2 w-full sm:w-auto justify-center">
                    Explore Budget
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link to="/project-tracker" className="w-full sm:w-auto">
                  <Button variant="heroOutline" className="gap-2 w-full sm:w-auto justify-center">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    Track Projects
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8"
              >
                <div className="min-w-[80px]">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-white">KES 3.9T</p>
                  <p className="text-xs sm:text-sm text-white/60">Total Budget FY24/25</p>
                </div>
                <div className="min-w-[80px]">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-kenya-green">12,847</p>
                  <p className="text-xs sm:text-sm text-white/60">Projects Tracked</p>
                </div>
                <div className="min-w-[80px]">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-kenya-red">47</p>
                  <p className="text-xs sm:text-sm text-white/60">Counties Covered</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total National Budget"
            value="KES 3.9T"
            subtitle="Fiscal Year 2024/25"
            icon={TrendingUp}
            trend={{ value: 12.5, label: "vs last year" }}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="County Allocations"
            value="KES 415B"
            subtitle="Equitable share + grants"
            icon={Building2}
            trend={{ value: 8.2, label: "increase" }}
            variant="success"
            delay={0.1}
          />
          <StatCard
            title="Active Projects"
            value="12,847"
            subtitle="Across all sectors"
            icon={FolderKanban}
            trend={{ value: -3.1, label: "completion rate" }}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Active Alerts"
            value="234"
            subtitle="Requiring attention"
            icon={Bell}
            trend={{ value: 15, label: "this month" }}
            variant="critical"
            delay={0.3}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Map & Chart */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <KenyaMap className="h-[300px] sm:h-[380px] lg:h-[420px]" />
          
          {/* Featured Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">Featured Projects</h2>
              <Link to="/project-tracker">
                <Button variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm">
                  View All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {FEATURED_PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Calculator & Alerts */}
        <div className="space-y-4 sm:space-y-6">
          <TaxCalculator />
          <BudgetChart />
          
          {/* Recent Alerts */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">Recent Alerts</h3>
              <Link to="/alerts">
                <Button variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm">
                  View All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_ALERTS.map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-kenya-black via-kenya-black/95 to-kenya-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-2">
              Platform Impact
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Making a difference in government accountability
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {IMPACT_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-kenya-green mx-auto mb-2 sm:mb-3" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4">
            Empowering Citizens with Transparency
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Access real-time budget data, track projects in your community, and hold government accountable. 
            Your tax shillings, your right to know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: BarChart3,
              title: "Budget Analytics",
              description: "Visualize national and county budgets with interactive charts. Compare spending across sectors and years.",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Eye,
              title: "Project Tracking",
              description: "Follow specific projects from allocation to completion. See real-time progress and flag concerns.",
              color: "bg-trust/10 text-trust",
            },
            {
              icon: Bell,
              title: "Smart Alerts",
              description: "Get notified about budget anomalies, delayed projects, and overspending in your area.",
              color: "bg-warning/10 text-warning",
            },
            {
              icon: Users,
              title: "Citizen Verification",
              description: "Report discrepancies you observe. Upload photos and help verify project progress on the ground.",
              color: "bg-kenya-red/10 text-kenya-red",
            },
            {
              icon: Building2,
              title: "County Comparison",
              description: "Compare how different counties allocate and spend their budgets. Find the best performers.",
              color: "bg-success/10 text-success",
            },
            {
              icon: ShieldCheck,
              title: "Data Integrity",
              description: "All data sourced from official government systems. Verified, accurate, and up-to-date.",
              color: "bg-primary/10 text-primary",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kenya-black via-kenya-red to-kenya-green opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative px-6 sm:px-8 py-10 sm:py-12 lg:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mx-auto mb-4" />
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4">
              Join the Transparency Movement
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Create an account to follow projects, receive personalized alerts, and contribute to government accountability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/auth">
                <Button variant="hero" className="bg-white text-kenya-black hover:bg-white/90 w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Button variant="heroOutline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-8 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-bold text-foreground mb-3">Uwazi Budget</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Promoting transparency and accountability in government spending.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Explore</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><Link to="/national-budget" className="hover:text-primary transition-colors">National Budget</Link></li>
              <li><Link to="/county-budget" className="hover:text-primary transition-colors">County Budgets</Link></li>
              <li><Link to="/project-tracker" className="hover:text-primary transition-colors">Project Tracker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Get Involved</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><Link to="/report" className="hover:text-primary transition-colors">Report Issue</Link></li>
              <li><Link to="/alerts" className="hover:text-primary transition-colors">Alert Center</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Data Sources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2024 Uwazi Budget. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
