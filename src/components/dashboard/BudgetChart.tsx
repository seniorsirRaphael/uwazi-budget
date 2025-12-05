import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const BUDGET_DATA = [
  { name: "Education", value: 544, color: "#006600" },
  { name: "Health", value: 312, color: "#BB0000" },
  { name: "Infrastructure", value: 478, color: "#1E88E5" },
  { name: "Security", value: 256, color: "#000000" },
  { name: "Agriculture", value: 156, color: "#4CAF50" },
  { name: "Debt Service", value: 890, color: "#FFB300" },
  { name: "Others", value: 364, color: "#757575" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          KES {data.value}B ({((data.value / 3000) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground truncate">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function BudgetChart() {
  const totalBudget = BUDGET_DATA.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">
            FY 2024/25 Budget Allocation
          </h3>
          <p className="text-sm text-muted-foreground">
            Total: KES {(totalBudget / 1000).toFixed(1)} Trillion
          </p>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          National
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={BUDGET_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {BUDGET_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
