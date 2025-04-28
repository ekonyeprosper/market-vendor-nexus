
import { Package, Users, BarChart3, CalendarIcon, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { products } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  // Sample stats data
  const stats = {
    totalSales: 45231.89,
    activeProducts: 2350,
    activeUsers: 12234,
    revenue: 89432.23
  };

  // Sample featured products (top 5)
  const featuredProducts = products.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader 
          title="Dashboard Overview"
          subtitle="Welcome back! Here's what's happening today"
          actionIcon={Package}
          actionLabel="Manage Products"
          actionLink="/admin/products"
        />
        
        <DashboardStats stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Recent Products</CardTitle>
              <a href="/admin/products" className="text-sm text-primary hover:underline">
                View all
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ProductsTable products={featuredProducts} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
