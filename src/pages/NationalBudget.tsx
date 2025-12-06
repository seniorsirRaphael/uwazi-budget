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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Treemap,
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Info,
  ChevronDown,
  Building2,
  Wallet,
  PiggyBank,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";

const MINISTRY_DATA = [
  { name: "Education", allocated: 544, spent: 489, variance: -10.1, color: "#006600" },
  { name: "Health", allocated: 312, spent: 298, variance: -4.5, color: "#BB0000" },
  { name: "Infrastructure", allocated: 478, spent: 523, variance: 9.4, color: "#1E88E5" },
  { name: "Security", allocated: 256, spent: 241, variance: -5.9, color: "#000000" },
  { name: "Agriculture", allocated: 156, spent: 134, variance: -14.1, color: "#4CAF50" },
  { name: "Energy", allocated: 198, spent: 187, variance: -5.6, color: "#FFB300" },
  { name: "Water", allocated: 145, spent: 152, variance: 4.8, color: "#00BCD4" },
  { name: "ICT", allocated: 89, spent: 76, variance: -14.6, color: "#9C27B0" },
];

const YEARLY_TREND = [
  { year: "2020/21", budget: 2870, actual: 2654, deviation: -7.5 },
  { year: "2021/22", budget: 3030, actual: 2891, deviation: -4.6 },
  { year: "2022/23", budget: 3310, actual: 3198, deviation: -3.4 },
  { year: "2023/24", budget: 3600, actual: 3512, deviation: -2.4 },
  { year: "2024/25", budget: 3900, actual: 2156, deviation: null },
];

const TREEMAP_DATA = [
  { name: "Education", size: 544, color: "#006600" },
  { name: "Debt Service", size: 890, color: "#757575" },
  { name: "Infrastructure", size: 478, color: "#1E88E5" },
  { name: "Health", size: 312, color: "#BB0000" },
  { name: "Security", size: 256, color: "#000000" },
  { name: "Energy", size: 198, color: "#FFB300" },
  { name: "Agriculture", size: 156, color: "#4CAF50" },
  { name: "Water", size: 145, color: "#00BCD4" },
  { name: "Others", size: 921, color: "#9E9E9E" },
];

const QUARTERLY_DATA = [
  { quarter: "Q1", development: 180, recurrent: 720, target: 975 },
  { quarter: "Q2", development: 210, recurrent: 780, target: 975 },
  { quarter: "Q3", development: 195, recurrent: 750, target: 975 },
  { quarter: "Q4", development: 238, recurrent: 808, target: 975 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-xl text-sm">
        <p className="font-semibold text-foreground mb-2">{label}</p>
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

const TreemapTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">KES {data.size}B</p>
        <p className="text-xs text-primary">
          {((data.size / 3900) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export default function NationalBudget() {
  const [selectedYear, setSelectedYear] = useState("2024/25");
  const [activeTab, setActiveTab] = useState<"overview" | "ministries" | "trends">("overview");

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              National Budget Explorer
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Fiscal Year {selectedYear} • Total Budget: KES 3.9 Trillion
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
              <Calendar className="w-4 h-4" />
              <span className="hidden xs:inline">{selectedYear}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden xs:inline">Filter</span>
            </Button>
            <Button variant="kenya" size="sm" className="gap-2 text-xs sm:text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Tabs for mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin lg:hidden">
          {[
            { id: "overview", label: "Overview" },
            { id: "ministries", label: "Ministries" },
            { id: "trends", label: "Trends" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "kenya" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Budget"
          value="KES 3.9T"
          icon={Wallet}
          variant="primary"
          trend={{ value: 8.3, label: "vs FY23/24" }}
        />
        <StatCard
          title="Spent to Date"
          value="KES 2.16T"
          subtitle="55.3% utilization"
          icon={TrendingDown}
          variant="success"
        />
        <StatCard
          title="Development"
          value="KES 823B"
          subtitle="21.1% of total"
          icon={Building2}
          variant="warning"
        />
        <StatCard
          title="Recurrent"
          value="KES 3.08T"
          subtitle="78.9% of total"
          icon={PiggyBank}
          variant="default"
        />
      </div>

      {/* Main Charts Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 ${activeTab !== "overview" && activeTab !== "ministries" ? "lg:block hidden" : ""}`}>
        {/* Budget by Ministry - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${activeTab === "trends" ? "hidden lg:block" : ""}`}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                Budget by Ministry
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Allocated vs Spent (KES Billions)
              </p>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Info className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MINISTRY_DATA} layout="vertical" margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={75}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="allocated" fill="#006600" name="Allocated" radius={[0, 4, 4, 0]} />
                <Bar dataKey="spent" fill="#BB0000" name="Spent" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend for mobile */}
          <div className="flex justify-center gap-6 mt-4 sm:hidden">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Allocated</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-kenya-red" />
              <span className="text-muted-foreground">Spent</span>
            </div>
          </div>
        </motion.div>

        {/* Budget Treemap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${activeTab === "trends" ? "hidden lg:block" : ""}`}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                Budget Distribution
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Proportional allocation view
              </p>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={TREEMAP_DATA}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#006600"
              >
                {TREEMAP_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Tooltip content={<TreemapTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quarterly Spending - New Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${activeTab === "ministries" ? "hidden lg:block" : ""}`}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
              Quarterly Budget Execution
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Development vs Recurrent spending by quarter
            </p>
          </div>
          <div className="hidden sm:flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-kenya-red" />
              <span className="text-muted-foreground">Recurrent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-warning" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={QUARTERLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="recurrent" stackId="1" stroke="#BB0000" fill="#BB0000" fillOpacity={0.6} name="Recurrent" />
              <Area type="monotone" dataKey="development" stackId="1" stroke="#006600" fill="#006600" fillOpacity={0.6} name="Development" />
              <Line type="monotone" dataKey="target" stroke="#FFB300" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Mobile legend */}
        <div className="flex justify-center gap-4 mt-4 sm:hidden">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Dev</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-kenya-red" />
            <span className="text-muted-foreground">Rec</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-4 h-0.5 bg-warning" />
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </motion.div>

      {/* Yearly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${activeTab === "ministries" ? "hidden lg:block" : ""}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
              Budget vs Actual Spending Trend
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              5-Year comparison (KES Billions)
            </p>
          </div>
          <div className="flex gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-kenya-red" />
              <span className="text-muted-foreground">Actual</span>
            </div>
          </div>
        </div>
        <div className="h-56 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={YEARLY_TREND}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="#006600"
                strokeWidth={2}
                dot={{ fill: '#006600', strokeWidth: 2, r: 3 }}
                name="Budget"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#BB0000"
                strokeWidth={2}
                dot={{ fill: '#BB0000', strokeWidth: 2, r: 3 }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Variance Table - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-border">
          <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
            Ministry Budget Variance Analysis
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Comparing allocated vs spent budgets
          </p>
        </div>
        
        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-border">
          {MINISTRY_DATA.map((ministry) => {
            const progress = Math.round((ministry.spent / ministry.allocated) * 100);
            const isOverspent = ministry.variance > 0;
            return (
              <div key={ministry.name} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ministry.color }} />
                    <span className="font-medium text-foreground">{ministry.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    isOverspent
                      ? 'bg-critical/10 text-critical'
                      : progress > 80
                      ? 'bg-warning/10 text-warning'
                      : 'bg-success/10 text-success'
                  }`}>
                    {isOverspent ? 'Overspent' : progress > 80 ? 'On Track' : 'Under Budget'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Allocated</p>
                    <p className="font-mono font-medium text-foreground">KES {ministry.allocated}B</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spent</p>
                    <p className="font-mono font-medium text-foreground">KES {ministry.spent}B</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Variance</p>
                    <p className={`font-mono font-semibold ${isOverspent ? 'text-critical' : 'text-success'}`}>
                      {ministry.variance > 0 ? '+' : ''}{ministry.variance}%
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isOverspent ? 'bg-critical' : 'bg-primary'}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Ministry</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-semibold text-muted-foreground">Allocated (B)</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-semibold text-muted-foreground">Spent (B)</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-semibold text-muted-foreground">Variance</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Status</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-muted-foreground">Progress</th>
              </tr>
            </thead>
            <tbody>
              {MINISTRY_DATA.map((ministry, index) => {
                const progress = Math.round((ministry.spent / ministry.allocated) * 100);
                const isOverspent = ministry.variance > 0;
                return (
                  <tr
                    key={ministry.name}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: ministry.color }}
                        />
                        <span className="font-medium text-foreground text-sm">{ministry.name}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right font-mono text-foreground text-sm">
                      KES {ministry.allocated}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right font-mono text-foreground text-sm">
                      KES {ministry.spent}
                    </td>
                    <td className={`px-4 lg:px-6 py-3 lg:py-4 text-right font-mono font-semibold text-sm ${
                      isOverspent ? 'text-critical' : 'text-success'
                    }`}>
                      {ministry.variance > 0 ? '+' : ''}{ministry.variance}%
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span className={`px-2 lg:px-3 py-1 text-xs font-medium rounded-full ${
                        isOverspent
                          ? 'bg-critical/10 text-critical'
                          : progress > 80
                          ? 'bg-warning/10 text-warning'
                          : 'bg-success/10 text-success'
                      }`}>
                        {isOverspent ? 'Overspent' : progress > 80 ? 'On Track' : 'Under Budget'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="w-20 lg:w-24 mx-auto">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isOverspent ? 'bg-critical' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-1">{progress}%</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
