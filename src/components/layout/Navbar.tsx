
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CartButton } from "./CartButton";
import { AuthButtons } from "./AuthButtons";
import { MobileMenu } from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <AuthButtons />
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
        />
      </div>
    </nav>
  );
};

export default Navbar;
