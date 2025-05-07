
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { createElement, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from '@/services/store/store';
import NetworkStatus from "@/components/common/NetworkStatus";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProduct from "./pages/seller/AddProduct";
import UserManagement from "./pages/admin/UserManagement";
import OrdersPage from "./pages/admin/Orders";
import AnalyticsPage from "./pages/admin/Analytics";
import FileManagerPage from "./pages/admin/FileManager";
import NotificationsPage from "./pages/admin/Notifications";
import SupportPage from "./pages/admin/Support";
import VendorDetail from "./pages/VendorDetail";
import PaymentCallback from "@/pages/PaymentCallback";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AdminCategories from "./pages/admin/Categories";
import Vendors from "./pages/Vendors";

// Create a new QueryClient instance inside the component
const App = () => {
  useEffect(() => {
    // Add PayStack Script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <CartProvider>
        <TooltipProvider>
          <NetworkStatus />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/vendor/:vendorId" element={<VendorDetail />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products/new" element={<AddProduct />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/orders" element={<OrdersPage />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="/admin/files" element={<FileManagerPage />} />
              <Route path="/admin/notifications" element={<NotificationsPage />} />
              <Route path="/admin/support" element={<SupportPage />} />
              <Route path="/payment/verify/:reference" element={<PaymentCallback />} />
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </Provider>
  );
};

export default App;
