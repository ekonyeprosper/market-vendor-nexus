
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

export const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-market-50" }: StatCardProps) => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          {trend && (
            <div className={cn(
              "mt-1 flex items-center text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className={cn("rounded-xl p-3", bgColor)}>
          <Icon className="h-6 w-6 text-market-600" />
        </div>
      </div>
    </div>
  );
};
