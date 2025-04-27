
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "md:hidden mt-4 pb-4",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="flex flex-col space-y-3">
        <NavLinks mobile onNavigate={onClose} />
        <div className="flex space-x-2 pt-2">
          <AuthButtons mobile onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
};
