
import { Link } from "react-router-dom";

export const NavLinks = ({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-gray-700 hover:text-market-600 ${
            mobile ? "py-2" : ""
          }`}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};
