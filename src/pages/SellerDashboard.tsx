import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Package, ShoppingCart, DollarSign, Users, Plus, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useGetProfileQuery, useUpdateSellerProfileMutation } from "@/services/api/userApi";
import { useGetSellerProductsQuery, useGetSellerDashboardStatsQuery, useUpdateProductStatusMutation, useDeleteProductMutation } from "@/services/api/productsApi";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useGetSellerOrdersQuery } from "@/services/api/ordersApi";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SellerDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productsPage, setProductsPage] = useState(1);
  const [productsLimit] = useState(8); // 2x4 grid
  const [productsSort, setProductsSort] = useState("-createdAt");
  const [productsStatus, setProductsStatus] = useState("active");
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit] = useState(10);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: productsData, isLoading: productsLoading } = useGetSellerProductsQuery({
    page: productsPage,
    limit: productsLimit,
    sort: productsSort,
    status: productsStatus
  }, {
    skip: activeTab !== "products"
  });

  const { data: stats, isLoading: statsLoading } = useGetSellerDashboardStatsQuery(undefined, {
    skip: activeTab !== "dashboard"
  });

  const { data: ordersData, isLoading: ordersLoading } = useGetSellerOrdersQuery({
    page: ordersPage,
    limit: ordersLimit
  }, {
    skip: activeTab !== "orders"
  });

  const [updateStatus] = useUpdateProductStatusMutation();
  const [updateProfile] = useUpdateSellerProfileMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleStatusToggle = async (productId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'draft' : 'active';
      await updateStatus({ productId, status: newStatus }).unwrap();
      toast({
        title: "Status Updated",
        description: `Product status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive"
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    try {
      await updateProfile(formData).unwrap();
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id).unwrap();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      setProductToDelete(null);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const renderVerificationAlert = () => {
    if (!profile?.adminVerified) {
      return (
        <Alert variant="default" className="mb-6 border-yellow-500 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Account Pending Verification</AlertTitle>
          <AlertDescription>
            Your seller account is currently under review. You can still browse the dashboard, but you won't be able to list products until your account is verified by an administrator.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (profileLoading || (activeTab === "dashboard" && statsLoading)) {
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
        {renderVerificationAlert()}
        
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">
                Welcome back, {profile?.businessName || 'Seller'}!
              </p>
              {profile?.adminVerified ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Seller
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Info className="w-3 h-3 mr-1" /> Pending Verification
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <Link to="/seller/products/new">
              <Button 
                className="flex items-center shadow-sm"
                disabled={!profile?.adminVerified}
                title={!profile?.adminVerified ? "Account verification required" : ""}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={DollarSign}
                title="Total Sales"
                value={stats ? formatCurrency(stats.totalSales) : "-"}
                trend={stats ? { value: stats.salesGrowth, isPositive: stats.salesGrowth > 0 } : undefined}
              />
              <StatCard
                icon={ShoppingCart}
                title="Orders"
                value={stats ? stats.totalOrders.toString() : "-"}
                trend={stats ? { value: stats.orderGrowth, isPositive: stats.orderGrowth > 0 } : undefined}
              />
              <StatCard
                icon={Package}
                title="Products"
                value={stats ? stats.totalProducts.toString() : "-"}
                trend={stats ? { value: stats.productGrowth, isPositive: stats.productGrowth > 0 } : undefined}
              />
              <StatCard
                icon={Users}
                title="Customers"
                value={stats ? stats.totalCustomers.toString() : "-"}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Sales Overview"
                description="Your sales performance for the past 6 months"
              >
                <BarChart data={stats?.salesOverview.map(item => ({
                  name: item.month,
                  sales: item.amount
                }))} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#6683f4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <div className="flex gap-4 items-center">
                <select 
                  className="h-9 rounded-md border border-input px-3 text-sm"
                  value={productsStatus}
                  onChange={(e) => setProductsStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                <select
                  className="h-9 rounded-md border border-input px-3 text-sm"
                  value={productsSort}
                  onChange={(e) => setProductsSort(e.target.value)}
                >
                  <option value="-createdAt">Latest First</option>
                  <option value="price.current">Price: Low to High</option>
                  <option value="-price.current">Price: High to Low</option>  
                </select>
                <Link to="/seller/products/new">
                  <Button size="sm">Add Product</Button>
                </Link>
              </div>
            </div>
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-gray-100 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse mb-2" />
                      <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productsData?.products.map((product) => (
                    <Card key={product._id} className="overflow-hidden">
                      <div className="h-40 bg-gray-100">
                        <img
                          src={product.images.find(img => img.isDefault)?.url || product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">{formatCurrency(product.price.current)}</span>
                          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleStatusToggle(product._id, product.status)}
                          >
                            {product.status === 'active' ? 'Set Draft' : 'Activate'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 text-red-600 hover:bg-red-50"
                            onClick={() => setProductToDelete({ id: product._id, name: product.name })}
                          >
                            Delete
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1" asChild>
                            <Link to={`/products/${product._id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {productsData?.pagination.pages > 1 && (
                  <div className="mt-6 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={productsPage === 1}
                      onClick={() => setProductsPage(p => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={productsPage === productsData.pagination.pages}
                      onClick={() => setProductsPage(p => Math.min(productsData.pagination.pages, p + 1))}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {ordersLoading ? (
                    <div className="p-4 text-center">Loading orders...</div>
                  ) : ordersData?.orders.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No orders found</div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          <th className="px-4 py-3">Order ID</th>
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Items</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Payment</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {ordersData?.orders.map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium">{order.orderId}</td>
                            <td className="px-4 py-4">
                              <div>{order.customerDetails.fullName}</div>
                              <div className="text-sm text-gray-500">{order.customerDetails.email}</div>
                            </td>
                            <td className="px-4 py-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-1">
                                  <img src={item.product.image} alt={item.product.name} className="w-8 h-8 object-cover rounded" />
                                  <span className="text-sm">{item.quantity}x {item.product.name}</span>
                                </div>
                              ))}
                            </td>
                            <td className="px-4 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td className="px-4 py-4">
                              <Badge variant={
                                order.status === "delivered" ? "success" :
                                order.status === "processing" ? "warning" :
                                "secondary"
                              }>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant={order.payment.status === "paid" ? "success" : "warning"}>
                                {order.payment.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <Button variant="ghost" size="sm">
                                Details
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

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your seller account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        defaultValue={profile?.fullName}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        defaultValue={profile?.businessName}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={profile?.phoneNumber}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <Input
                        id="businessAddress"
                        name="businessAddress"
                        defaultValue={profile?.businessAddress}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="profileImage">Profile Image</Label>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Update Profile</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteProduct}
                className="bg-red-600 hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
