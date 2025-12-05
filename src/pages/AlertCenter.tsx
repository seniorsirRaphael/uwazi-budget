import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Filter,
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Building2,
  ArrowRight,
  Settings,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertCard, Alert } from "@/components/dashboard/AlertCard";

const ALL_ALERTS: Alert[] = [
  {
    id: "1",
    title: "Critical: Budget Overrun Detected",
    description: "Nakuru County road project has exceeded allocated budget by 23%. The Ministry of Roads has been notified and an audit has been initiated.",
    severity: "critical",
    county: "Nakuru",
    sector: "Infrastructure",
    amount: "KES 45.2M overspent",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Project Milestone Delayed",
    description: "Kisumu health center construction is 3 months behind schedule. Contractor cited supply chain issues and weather delays.",
    severity: "warning",
    county: "Kisumu",
    sector: "Health",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "Successful Project Completion",
    description: "Mombasa water treatment plant completed on time and under budget. Now serving 50,000 residents with clean water.",
    severity: "success",
    county: "Mombasa",
    sector: "Water",
    amount: "KES 120M total",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    title: "Tender Award Under Review",
    description: "Questions raised about the tender process for Nairobi-Thika expressway maintenance contract worth KES 2.3B.",
    severity: "warning",
    county: "Nairobi",
    sector: "Infrastructure",
    amount: "KES 2.3B",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    title: "Funds Disbursement Completed",
    description: "Quarter 2 education funds successfully disbursed to all 47 counties. Total of KES 89.4B distributed.",
    severity: "info",
    sector: "Education",
    amount: "KES 89.4B",
    timestamp: "2 days ago",
  },
  {
    id: "6",
    title: "Ghost Project Flagged",
    description: "Citizen report verified: No construction activity at supposed Bungoma health post site despite 60% budget drawn.",
    severity: "critical",
    county: "Bungoma",
    sector: "Health",
    amount: "KES 12.4M",
    timestamp: "2 days ago",
  },
  {
    id: "7",
    title: "Quality Inspection Passed",
    description: "Kiambu-Limuru road upgrade passed quality audit. Construction meets all specified standards.",
    severity: "success",
    county: "Kiambu",
    sector: "Infrastructure",
    timestamp: "3 days ago",
  },
  {
    id: "8",
    title: "Budget Amendment Proposed",
    description: "Treasury proposes 15% reallocation from recurrent to development expenditure for remaining FY.",
    severity: "info",
    amount: "KES 234B affected",
    timestamp: "3 days ago",
  },
];

const SEVERITY_OPTIONS = ["All", "Critical", "Warning", "Info", "Success"];
const SECTOR_OPTIONS = ["All Sectors", "Health", "Education", "Infrastructure", "Water", "Agriculture"];

export default function AlertCenter() {
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = ALL_ALERTS.filter((alert) => {
    const matchesSeverity = selectedSeverity === "All" || 
      alert.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesSector = selectedSector === "All Sectors" || alert.sector === selectedSector;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSector && matchesSearch;
  });

  const alertCounts = {
    critical: ALL_ALERTS.filter(a => a.severity === "critical").length,
    warning: ALL_ALERTS.filter(a => a.severity === "warning").length,
    info: ALL_ALERTS.filter(a => a.severity === "info").length,
    success: ALL_ALERTS.filter(a => a.severity === "success").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            Alert Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time budget alerts and anomaly notifications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </Button>
          <Button variant="kenya" className="gap-2">
            <BellRing className="w-4 h-4" />
            Subscribe
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-critical/5 border border-critical/20 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-critical/10">
              <AlertTriangle className="w-5 h-5 text-critical" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-critical">{alertCounts.critical}</p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warning/5 border border-warning/20 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-warning/10">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-warning">{alertCounts.warning}</p>
              <p className="text-sm text-muted-foreground">Warning</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-trust/5 border border-trust/20 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-trust/10">
              <AlertCircle className="w-5 h-5 text-trust" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-trust">{alertCounts.info}</p>
              <p className="text-sm text-muted-foreground">Info</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-success/5 border border-success/20 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-success">{alertCounts.success}</p>
              <p className="text-sm text-muted-foreground">Success</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex gap-2">
          {SEVERITY_OPTIONS.map(severity => (
            <Button
              key={severity}
              variant={selectedSeverity === severity ? "kenya" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity(severity)}
            >
              {severity}
            </Button>
          ))}
        </div>

        {/* Sector Filter */}
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {SECTOR_OPTIONS.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredAlerts.length}</span> alerts
        </p>
        <Button variant="ghost" size="sm" className="gap-2">
          <Clock className="w-4 h-4" />
          Most Recent
        </Button>
      </div>

      {/* Alert List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAlerts.map((alert, index) => (
          <AlertCard key={alert.id} alert={alert} delay={index * 0.05} />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-2xl">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No alerts found matching your filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSelectedSeverity("All");
            setSelectedSector("All Sectors");
            setSearchQuery("");
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Subscribe CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-kenya-red/10 border border-primary/20 rounded-2xl p-8 text-center"
      >
        <BellRing className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-foreground mb-2">
          Never Miss an Alert
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to receive personalized alerts about budget issues in your county, 
          sector, or projects you're following.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="kenya" className="gap-2">
            <Bell className="w-4 h-4" />
            Subscribe to Alerts
          </Button>
          <Button variant="outline" className="gap-2">
            Customize Preferences
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
