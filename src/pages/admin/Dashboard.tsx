import { useState } from "react";
import { Package, Users, BarChart3, CalendarIcon, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminDashboardStatsQuery } from "@/services/api/ordersApi";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/StatCard";

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState<any>('month');
  const { data: dashboardStats, isLoading } = useGetAdminDashboardStatsQuery({ timeframe });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6 p-6">
          <div>Loading dashboard stats...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <DashboardHeader 
            title="Dashboard Overview"
            subtitle="Welcome back! Here's what's happening today"
            actionIcon={Package}
            actionLabel="Manage Products"
            actionLink="/admin/products"
          />
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={BarChart3}
            title="Total Revenue"
            value={formatCurrency(dashboardStats?.overview.totalRevenue || 0)}
          />
          <StatCard
            icon={Package}
            title="Total Orders"
            value={dashboardStats?.overview.totalOrders.toString() || '0'}
          />
          <StatCard
            icon={Users}
            title="Average Order Value"
            value={formatCurrency(dashboardStats?.overview.avgOrderValue || 0)}
          />
          <StatCard
            icon={Clock}
            title="Pending Orders"
            value={dashboardStats?.overview.pendingOrders.toString() || '0'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {timeframe === 'today' ? 'Hourly' : 
                     timeframe === 'week' ? 'Daily' : 
                     timeframe === 'month' ? 'Weekly' : 'Monthly'} breakdown
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SalesChart data={dashboardStats?.salesChart} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed activities={dashboardStats?.recentOrders} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;