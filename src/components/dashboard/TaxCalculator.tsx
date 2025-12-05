import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TAX_BRACKETS = [
  { min: 0, max: 24000, rate: 0.10 },
  { min: 24001, max: 32333, rate: 0.25 },
  { min: 32334, max: 500000, rate: 0.30 },
  { min: 500001, max: 800000, rate: 0.325 },
  { min: 800001, max: Infinity, rate: 0.35 },
];

const BUDGET_ALLOCATION = [
  { sector: "Education", percentage: 25, color: "bg-chart-1" },
  { sector: "Health", percentage: 15, color: "bg-chart-2" },
  { sector: "Infrastructure", percentage: 20, color: "bg-chart-3" },
  { sector: "Security", percentage: 12, color: "bg-chart-4" },
  { sector: "Agriculture", percentage: 8, color: "bg-chart-5" },
  { sector: "Others", percentage: 20, color: "bg-muted-foreground" },
];

function calculatePAYE(grossSalary: number): number {
  let tax = 0;
  let remainingSalary = grossSalary;

  for (const bracket of TAX_BRACKETS) {
    if (remainingSalary <= 0) break;
    const taxableInBracket = Math.min(remainingSalary, bracket.max - bracket.min + 1);
    tax += taxableInBracket * bracket.rate;
    remainingSalary -= taxableInBracket;
  }

  // Personal relief (KES 2,400 per month)
  tax = Math.max(0, tax - 2400);
  
  return Math.round(tax);
}

export function TaxCalculator() {
  const [salary, setSalary] = useState<string>("50000");
  const [isCalculated, setIsCalculated] = useState(false);

  const salaryNum = parseInt(salary.replace(/,/g, "")) || 0;
  const monthlyTax = useMemo(() => calculatePAYE(salaryNum), [salaryNum]);
  const yearlyTax = monthlyTax * 12;

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground">
            Track Your Tax
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Monthly Gross Salary (KES)
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value.replace(/[^0-9]/g, ""));
                setIsCalculated(false);
              }}
              placeholder="e.g., 50000"
              className="w-full bg-muted text-foreground px-4 py-3 rounded-lg text-lg font-mono border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button 
            onClick={handleCalculate}
            variant="kenya"
            className="w-full"
          >
            Calculate My Tax Impact
          </Button>
        </div>
      </div>

      {isCalculated && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-6 bg-muted/30"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground mb-1">Monthly PAYE</p>
              <p className="text-2xl font-display font-bold text-kenya-red">
                {formatCurrency(monthlyTax)}
              </p>
            </div>
            <div className="text-center p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground mb-1">Yearly PAYE</p>
              <p className="text-2xl font-display font-bold text-primary">
                {formatCurrency(yearlyTax)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="w-4 h-4" />
              <span>Where your tax goes:</span>
            </div>
            
            {BUDGET_ALLOCATION.map((item, index) => (
              <div key={item.sector} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.sector}</span>
                  <span className="font-mono text-muted-foreground">
                    {formatCurrency(Math.round((yearlyTax * item.percentage) / 100))}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
