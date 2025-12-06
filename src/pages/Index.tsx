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

export default function Index() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-4 lg:-mx-6 lg:-mt-6 overflow-hidden">
        <div className="relative h-[600px] lg:h-[700px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt="Kenya cityscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Kenya Stripe Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-kenya-black via-kenya-red via-50% to-kenya-green" />

          {/* Content */}
          <div className="relative h-full flex items-center px-4 lg:px-12">
            <div className="max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-4">
                  <ShieldCheck className="w-4 h-4 text-kenya-green" />
                  Government Budget Transparency Portal
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
              >
                Uwazi Budget
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl text-kenya-green font-display font-semibold"
              >
                See Every Shilling, Build Our Nation
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/80 max-w-xl"
              >
                Track how your tax money flows from the National Treasury to local projects. 
                Real-time visibility into government spending across all 47 counties.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link to="/national-budget">
                  <Button variant="hero" className="gap-2">
                    Explore Budget
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/project-tracker">
                  <Button variant="heroOutline" className="gap-2">
                    <Eye className="w-5 h-5" />
                    Track Projects
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-8 pt-8"
              >
                <div>
                  <p className="text-3xl font-display font-bold text-white">KES 3.9T</p>
                  <p className="text-sm text-white/60">Total Budget FY24/25</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-kenya-green">12,847</p>
                  <p className="text-sm text-white/60">Projects Tracked</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-kenya-red">47</p>
                  <p className="text-sm text-white/60">Counties Covered</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Map & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <KenyaMap className="h-[420px]" />
          
          {/* Featured Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl text-foreground">Featured Projects</h2>
              <Link to="/project-tracker">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Calculator & Alerts */}
        <div className="space-y-6">
          <TaxCalculator />
          <BudgetChart />
          
          {/* Recent Alerts */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-foreground">Recent Alerts</h3>
              <Link to="/alerts">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
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

      {/* Features Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Empowering Citizens with Transparency
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access real-time budget data, track projects in your community, and hold government accountable. 
            Your tax shillings, your right to know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: BarChart3,
              title: "Budget Analytics",
              description: "Visualize national and county budgets with interactive charts. Compare spending across sectors and years.",
            },
            {
              icon: Eye,
              title: "Project Tracking",
              description: "Follow specific projects from allocation to completion. See real-time progress and flag concerns.",
            },
            {
              icon: Bell,
              title: "Smart Alerts",
              description: "Get notified about budget anomalies, delayed projects, and overspending in your area.",
            },
            {
              icon: Users,
              title: "Citizen Verification",
              description: "Report discrepancies you observe. Upload photos and help verify project progress on the ground.",
            },
            {
              icon: Building2,
              title: "County Comparison",
              description: "Compare how different counties allocate and spend their budgets. Find the best performers.",
            },
            {
              icon: ShieldCheck,
              title: "Data Integrity",
              description: "All data sourced from official government systems. Verified, accurate, and up-to-date.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kenya-black via-kenya-red to-kenya-green opacity-90" />
        <div className="relative px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Join the Transparency Movement
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Create an account to follow projects, receive personalized alerts, and contribute to government accountability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" className="bg-white text-kenya-black hover:bg-white/90">
                Create Free Account
              </Button>
              <Button variant="heroOutline">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
