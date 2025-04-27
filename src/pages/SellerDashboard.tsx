import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  Package, ShoppingCart, DollarSign, Users, Plus, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5200 },
  { name: "Jul", sales: 7000 },
];

const productPerformance = [
  { name: "Wireless Earbuds", sales: 132, revenue: 11880 },
  { name: "Smart Watch", sales: 89, revenue: 8010 },
  { name: "Bluetooth Speaker", sales: 67, revenue: 4690 },
  { name: "Phone Case", sales: 43, revenue: 1290 },
];

// Sample products for the products tab
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    inventory: 45,
    status: "Active",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 199.99,
    inventory: 18,
    status: "Active",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Premium Bluetooth Speaker",
    price: 129.99,
    inventory: 32,
    status: "Active",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Phone Case - iPhone 13",
    price: 29.99,
    inventory: 54,
    status: "Active",
    image: "https://images.unsplash.com/photo-1541877590-3069a4a6a3ee?q=80&w=600&auto=format&fit=crop",
  },
];

// Sample orders for the orders tab
const orders = [
  {
    id: "#ORD-5531",
    customer: "John Smith",
    date: "2023-04-23",
    status: "Delivered",
    total: 119.98,
    items: 2,
  },
  {
    id: "#ORD-5532",
    customer: "Emily Johnson",
    date: "2023-04-23",
    status: "Processing",
    total: 89.99,
    items: 1,
  },
  {
    id: "#ORD-5533",
    customer: "Michael Brown",
    date: "2023-04-22",
    status: "Shipped",
    total: 259.97,
    items: 3,
  },
  {
    id: "#ORD-5534",
    customer: "Sarah Wilson",
    date: "2023-04-21",
    status: "Delivered",
    total: 129.99,
    items: 1,
  },
  {
    id: "#ORD-5535",
    customer: "David Lee",
    date: "2023-04-21",
    status: "Processing",
    total: 59.98,
    items: 2,
  },
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, TechGear!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/seller/products/new">
              <Button className="flex items-center shadow-sm">
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
                value="$12,628"
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatCard
                icon={ShoppingCart}
                title="Orders"
                value="145"
                trend={{ value: 8.2, isPositive: true }}
              />
              <StatCard
                icon={Package}
                title="Products"
                value="24"
                trend={{ value: 4, isPositive: true }}
              />
              <StatCard
                icon={Users}
                title="Customers"
                value="89"
                trend={{ value: 2.5, isPositive: false }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Sales Overview"
                description="Your sales performance for the past 7 months"
              >
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#6683f4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartCard>

              <ChartCard
                title="Recent Performance"
                description="Daily sales trends for the past 30 days"
              >
                <LineChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#6683f4" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ChartCard>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Top Performing Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="pb-3 font-medium text-muted-foreground">Product Name</th>
                        <th className="pb-3 font-medium text-muted-foreground">Units Sold</th>
                        <th className="pb-3 font-medium text-muted-foreground">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {productPerformance.map((product, index) => (
                        <tr key={index} className="text-sm">
                          <td className="py-3 font-medium">{product.name}</td>
                          <td className="py-3">{product.sales}</td>
                          <td className="py-3">${product.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <Link to="/seller/products/new">
                <Button size="sm">Add Product</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">${product.price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.inventory}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Items</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 font-medium">{order.id}</td>
                          <td className="px-4 py-4">{order.customer}</td>
                          <td className="px-4 py-4">{order.date}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">{order.items}</td>
                          <td className="px-4 py-4">${order.total}</td>
                          <td className="px-4 py-4">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your seller account preferences</CardDescription>
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

export default SellerDashboard;
