
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AuthButtons = ({ mobile = false, onNavigate?: () => void }) => {
  return (
    <>
      <Link to="/login" className={mobile ? "flex-1" : ""}>
        <Button
          variant="outline"
          className={mobile ? "w-full" : ""}
          size={mobile ? "default" : "sm"}
          onClick={onNavigate}
        >
          Log in
        </Button>
      </Link>
      <Link to="/signup" className={mobile ? "flex-1" : ""}>
        <Button
          className={mobile ? "w-full" : ""}
          size={mobile ? "default" : "sm"}
          onClick={onNavigate}
        >
          Sign up
        </Button>
      </Link>
    </>
  );
};
