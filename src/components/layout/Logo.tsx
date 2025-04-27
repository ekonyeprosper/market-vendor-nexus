import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/CAMPUSTRADELOGO7.jpg" 
        alt="CampusTrade Logo" 
        className="h-10 w-auto rounded-lg"
      />
      <span className="text-xl font-semibold">CampusTrade</span>
    </Link>
  );
};
