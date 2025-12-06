import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Search,
  Filter,
  ArrowUpDown,
  MapPin,
  Users,
  TrendingUp,
  Star,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KenyaMap } from "@/components/dashboard/KenyaMap";

const COUNTIES_DATA = [
  { name: "Nairobi", budget: 42.5, spent: 38.2, population: 4.4, perCapita: 9659, grade: "A", projects: 156 },
  { name: "Mombasa", budget: 18.2, spent: 15.8, population: 1.2, perCapita: 15167, grade: "B+", projects: 89 },
  { name: "Kisumu", budget: 15.8, spent: 14.1, population: 1.2, perCapita: 13167, grade: "B", projects: 72 },
  { name: "Nakuru", budget: 22.1, spent: 25.4, population: 2.2, perCapita: 10045, grade: "C+", projects: 98 },
  { name: "Kiambu", budget: 19.5, spent: 17.2, population: 2.4, perCapita: 8125, grade: "B", projects: 112 },
  { name: "Machakos", budget: 14.3, spent: 12.8, population: 1.4, perCapita: 10214, grade: "B-", projects: 67 },
  { name: "Uasin Gishu", budget: 12.4, spent: 11.1, population: 1.2, perCapita: 10333, grade: "B", projects: 65 },
  { name: "Kakamega", budget: 16.8, spent: 14.9, population: 1.9, perCapita: 8842, grade: "C+", projects: 78 },
  { name: "Kilifi", budget: 13.2, spent: 11.5, population: 1.5, perCapita: 8800, grade: "C", projects: 54 },
  { name: "Bungoma", budget: 11.9, spent: 10.2, population: 1.7, perCapita: 7000, grade: "C", projects: 61 },
];

const SECTOR_COMPARISON = [
  { sector: "Health", nairobi: 85, mombasa: 72, kisumu: 68 },
  { sector: "Education", nairobi: 90, mombasa: 78, kisumu: 82 },
  { sector: "Infrastructure", nairobi: 75, mombasa: 85, kisumu: 70 },
  { sector: "Water", nairobi: 65, mombasa: 60, kisumu: 75 },
  { sector: "Agriculture", nairobi: 45, mombasa: 40, kisumu: 85 },
  { sector: "Trade", nairobi: 88, mombasa: 90, kisumu: 65 },
];

const gradeColors: Record<string, string> = {
  "A": "bg-success text-white",
  "A-": "bg-success/80 text-white",
  "B+": "bg-primary text-primary-foreground",
  "B": "bg-primary/80 text-primary-foreground",
  "B-": "bg-trust text-white",
  "C+": "bg-warning text-foreground",
  "C": "bg-warning/80 text-foreground",
  "C-": "bg-critical/80 text-white",
  "D": "bg-critical text-white",
};

export default function CountyBudget() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"budget" | "perCapita" | "grade">("budget");
  const [showSearch, setShowSearch] = useState(false);

  const filteredCounties = COUNTIES_DATA
    .filter(county => county.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "budget") return b.budget - a.budget;
      if (sortBy === "perCapita") return b.perCapita - a.perCapita;
      return a.grade.localeCompare(b.grade);
    });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-xl">
          <p className="font-semibold text-foreground mb-2 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs sm:text-sm" style={{ color: entry.color }}>
              {entry.name}: KES {entry.value}B
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              County Budget Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Compare and analyze budgets across Kenya's 47 counties
            </p>
          </div>
          <div className="flex gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </Button>
            
            {/* Desktop Search */}
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search counties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-48 lg:w-auto"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search counties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary/10">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-display font-bold text-foreground">47</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Counties</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-success/10">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-display font-bold text-foreground">KES 415B</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Allocation</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-trust/10">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-trust" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-display font-bold text-foreground">54M</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Population</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-warning/10">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-display font-bold text-foreground">KES 7,685</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg. Per Capita</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Map */}
        <div className="xl:col-span-2">
          <KenyaMap
            className="h-[300px] sm:h-[400px] lg:h-[500px]"
            onCountyClick={(county) => setSelectedCounty(county)}
          />
        </div>

        {/* County List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <div className="p-3 sm:p-4 border-b border-border">
            <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
              County Rankings
            </h3>
            <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto scrollbar-thin pb-1">
              {(["budget", "perCapita", "grade"] as const).map((sort) => (
                <Button
                  key={sort}
                  variant={sortBy === sort ? "kenya" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(sort)}
                  className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 whitespace-nowrap"
                >
                  {sort === "budget" ? "Budget" : sort === "perCapita" ? "Per Capita" : "Grade"}
                </Button>
              ))}
            </div>
          </div>
          <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto scrollbar-thin">
            {filteredCounties.map((county, index) => (
              <motion.div
                key={county.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCounty(county.name)}
                className={`p-3 sm:p-4 border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedCounty === county.name ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground w-5 sm:w-6 flex-shrink-0">
                      {index + 1}.
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">{county.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                        {county.projects} projects • {county.population}M people
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-semibold text-foreground text-xs sm:text-sm">
                      KES {county.budget}B
                    </p>
                    <span className={`inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded ${gradeColors[county.grade]}`}>
                      {county.grade}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Budget Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-4 sm:mb-6">
            Top 10 County Budgets
          </h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCounties.slice(0, 10)} layout="vertical" margin={{ left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={70}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="budget" fill="#006600" name="Budget" radius={[0, 4, 4, 0]} />
                <Bar dataKey="spent" fill="#BB0000" name="Spent" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Budget</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-kenya-red" />
              <span className="text-muted-foreground">Spent</span>
            </div>
          </div>
        </motion.div>

        {/* Sector Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-1 sm:mb-2">
            Sector Performance Comparison
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Nairobi vs Mombasa vs Kisumu
          </p>
          <div className="h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={SECTOR_COMPARISON}>
                <PolarGrid />
                <PolarAngleAxis dataKey="sector" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Nairobi" dataKey="nairobi" stroke="#006600" fill="#006600" fillOpacity={0.3} />
                <Radar name="Mombasa" dataKey="mombasa" stroke="#BB0000" fill="#BB0000" fillOpacity={0.3} />
                <Radar name="Kisumu" dataKey="kisumu" stroke="#1E88E5" fill="#1E88E5" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 mt-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Nairobi</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-kenya-red" />
              <span className="text-muted-foreground">Mombasa</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-trust" />
              <span className="text-muted-foreground">Kisumu</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
