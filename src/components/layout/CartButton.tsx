
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const CartButton = () => {
  return (
    <Link to="/cart" className="text-gray-700 hover:text-market-600 relative">
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-market-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        0
      </span>
    </Link>
  );
};
