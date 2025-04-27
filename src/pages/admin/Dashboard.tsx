import { Package, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader 
          title="Admin Dashboard"
          subtitle="Monitor and manage your marketplace"
          actionIcon={Package}
          actionLabel="Manage Products"
          actionLink="/admin/products"
        />
        
        <DashboardStats stats={stats} />

        {/* Recent Products */}
        <Card className="mb-8 mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Products</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ProductsTable products={featuredProducts} />
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-market-100 flex items-center justify-center text-market-600">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New product added</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sales report generated</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
