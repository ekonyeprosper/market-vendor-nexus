import { Menu, User, Store } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/services/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CartButton } from "./CartButton";
import { AuthButtons } from "./AuthButtons";
import { MobileMenu } from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user?.role) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'seller':
        return '/seller/dashboard';
      default:
        return '/';
    }
  };

  const renderDashboardButton = () => {
    if (!user) return null;

    let icon = <User className="h-4 w-4 mr-2" />;
    let text = 'Dashboard';

    if (user.role === 'seller') {
      icon = <Store className="h-4 w-4 mr-2" />;
      text = 'Seller Dashboard';
    } else if (user.role === 'admin') {
      text = 'Admin Dashboard';
    }

    return (
      <Link to={getDashboardLink()}>
        <Button variant="outline" size="sm">
          {icon}
          {text}
        </Button>
      </Link>
    );
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <CartButton />
            
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {renderDashboardButton()}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <AuthButtons />
              )}
            </div>
            
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          dashboardLink={getDashboardLink()}
          onLogout={logout}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navbar;
