import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  ArrowUpDown,
  Building2,
  Heart,
  Share2,
  Eye,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, Project } from "@/components/dashboard/ProjectCard";
import projectSchool from "@/assets/images/machakossolar.jpg";
import projectRoad from "@/assets/images/kiambutechnical.jpg.jpg";
import projectHealth from "@/assets/images/kisumuprimary.jpg";
import projectSchool from "@/assets/images/mombasaphase2.jpg";
import projectRoad from "@/assets/images/nakuruwater.jpg.jpg";

const SECTORS = ["All", "Health", "Education", "Infrastructure", "Water", "Agriculture", "Energy"];
const STATUSES = ["All", "On Track", "Delayed", "At Risk", "Completed"];
const COUNTIES = ["All Counties", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos"];

const PROJECTS: Project[] = [
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
    image: projectHealth,
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
  {
    id: "4",
    title: "Nakuru Water Treatment Plant Upgrade",
    county: "Nakuru",
    ward: "Nakuru Town East",
    sector: "Water",
    budget: 320000000,
    spent: 298000000,
    status: "on-track",
    startDate: "Feb 2024",
    endDate: "Nov 2024",
    image: nakuruwater.jpg,
    contractor: "Aqua Solutions Kenya",
  },
  {
    id: "5",
    title: "Kiambu County Technical Institute",
    county: "Kiambu",
    ward: "Thika",
    sector: "Education",
    budget: 180000000,
    spent: 45000000,
    status: "on-track",
    startDate: "Apr 2024",
    endDate: "Mar 2026",
    image: kiambutechnical,
    contractor: "National Construction Co.",
  },
  {
    id: "6",
    title: "Machakos Solar Power Plant",
    county: "Machakos",
    sector: "Energy",
    budget: 890000000,
    spent: 890000000,
    status: "completed",
    startDate: "Jan 2023",
    endDate: "Oct 2024",
    image:machakossolar,
    contractor: "Green Energy Solutions",
  },
];

export default function ProjectTracker() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSector = selectedSector === "All" || project.sector === selectedSector;
    const matchesStatus = selectedStatus === "All" || 
      project.status.replace("-", " ").toLowerCase() === selectedStatus.toLowerCase();
    const matchesCounty = selectedCounty === "All Counties" || project.county === selectedCounty;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesStatus && matchesCounty && matchesSearch;
  });

  const stats = {
    total: PROJECTS.length,
    onTrack: PROJECTS.filter(p => p.status === "on-track").length,
    delayed: PROJECTS.filter(p => p.status === "delayed").length,
    atRisk: PROJECTS.filter(p => p.status === "at-risk").length,
    completed: PROJECTS.filter(p => p.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            Project Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Track government projects from allocation to completion
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant={viewMode === "grid" ? "kenya" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "kenya" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Projects", value: stats.total, color: "bg-muted" },
          { label: "On Track", value: stats.onTrack, color: "bg-success/10 text-success" },
          { label: "Delayed", value: stats.delayed, color: "bg-warning/10 text-warning" },
          { label: "At Risk", value: stats.atRisk, color: "bg-critical/10 text-critical" },
          { label: "Completed", value: stats.completed, color: "bg-trust/10 text-trust" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${stat.color}`}
          >
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, counties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Sector Filter */}
        <div className="relative">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {SECTORS.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* County Filter */}
        <div className="relative">
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {COUNTIES.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
        </p>
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowUpDown className="w-4 h-4" />
          Sort by Budget
        </Button>
      </div>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.1} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-all"
            >
              <div className="flex gap-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{project.county}</span>
                        <span>•</span>
                        <Building2 className="w-4 h-4" />
                        <span>{project.sector}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === "on-track" ? "bg-success text-white" :
                      project.status === "delayed" ? "bg-warning text-foreground" :
                      project.status === "at-risk" ? "bg-critical text-white" :
                      "bg-trust text-white"
                    }`}>
                      {project.status.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-mono text-foreground">
                        KES {(project.budget / 1000000).toFixed(0)}M
                      </span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(project.spent / project.budget) * 100}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground">
                        {Math.round((project.spent / project.budget) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="iconSm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="iconSm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="iconSm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found matching your filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSelectedSector("All");
            setSelectedStatus("All");
            setSelectedCounty("All Counties");
            setSearchQuery("");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
