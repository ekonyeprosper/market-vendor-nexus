import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { User, Store } from "lucide-react";
import type { User as UserType } from "@/services/types/auth.types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  dashboardLink: string;
  onLogout: () => void;
  user: UserType | null;
}

export const MobileMenu = ({ 
  isOpen, 
  onClose,
  isAuthenticated,
  dashboardLink,
  onLogout,
  user
}: MobileMenuProps) => {
  const getDashboardIcon = () => {
    if (!user) return <User className="h-4 w-4 mr-2" />;
    return user.role === 'seller' ? 
      <Store className="h-4 w-4 mr-2" /> : 
      <User className="h-4 w-4 mr-2" />;
  };

  const getDashboardText = () => {
    if (!user) return 'Dashboard';
    if (user.role === 'seller') {
      return 'Seller Dashboard';
    }
    return user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard';
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavLinks mobile onNavigate={onClose} />
        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              <Link 
                to={dashboardLink}
                onClick={onClose}
                className="w-full"
              >
                <Button className="w-full" variant="outline">
                  {getDashboardIcon()}
                  {getDashboardText()}
                </Button>
              </Link>
              <Button 
                className="w-full" 
                variant="ghost"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <AuthButtons mobile onNavigate={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};
