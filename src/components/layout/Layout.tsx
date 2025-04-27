
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AdminSidebar } from "../admin/AdminSidebar";
import { AdminFooter } from "../admin/AdminFooter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Folder } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <div className="flex h-16 items-center border-b px-4">
              <SidebarTrigger />
              <span className="ml-4 flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              </span>
            </div>
            <main className="flex-1 p-6">{children}</main>
            <AdminFooter />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
