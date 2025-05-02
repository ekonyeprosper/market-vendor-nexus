import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfileQuery } from "@/services/api/userApi";
import { Badge } from "@/components/ui/badge";
import { useGetCustomerOrdersQuery } from "@/services/api/ordersApi";
import type { Order } from "@/services/types/order.types";
import { ShoppingBag, User, Heart, Settings } from "lucide-react";
import { format } from "date-fns";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit] = useState(10);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetCustomerOrdersQuery({
    page: ordersPage,
    limit: ordersLimit
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.fullName}!
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {ordersLoading ? (
                    <div className="p-4 text-center">Loading orders...</div>
                  ) : ordersData?.orders.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="font-medium text-lg mb-1">No orders yet</h3>
                      <p className="text-sm text-gray-500">When you make your first order, it will appear here.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          <th className="px-4 py-3">Order ID</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Items</th>
                          <th className="px-4 py-3">Total</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {ordersData?.orders.map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium">{order.orderId}</td>
                            <td className="px-4 py-4">
                              {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant={
                                order.status === "delivered" ? "success" :
                                order.status === "shipped" ? "default" :
                                order.status === "processing" ? "warning" :
                                "secondary"
                              }>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                            </td>
                            <td className="px-4 py-4">{formatCurrency(order.totals.final)}</td>
                            <td className="px-4 py-4">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>

            {ordersData?.pagination.pages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={ordersPage === 1}
                  onClick={() => setOrdersPage(p => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={ordersPage === ordersData.pagination.pages}
                  onClick={() => setOrdersPage(p => Math.min(ordersData.pagination.pages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Wishlist content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="mt-1">{profile?.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="mt-1">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="mt-1">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
