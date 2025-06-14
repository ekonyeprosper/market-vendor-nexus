
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

export const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-blue-50" }: StatCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 break-words">{value}</p>
            {trend && (
              <p className={`text-xs sm:text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className={`${bgColor} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
