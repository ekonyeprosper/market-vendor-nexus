
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  FolderCog,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
      {
        title: "Products",
        icon: Package,
        path: "/admin/products",
      },
      {
        title: "Users",
        icon: Users,
        path: "/admin/users",
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
      {
        title: "File Manager",
        icon: FolderCog,
        path: "/admin/files",
      },
    ],
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2 px-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Package className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold">CampusTrade</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.path}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
