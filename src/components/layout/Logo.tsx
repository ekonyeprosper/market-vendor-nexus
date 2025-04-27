
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Package className="h-6 w-6" />
      </div>
      <span className="text-xl font-semibold">CampusTrade</span>
    </Link>
  );
};
