import { Link } from "react-router";
import ConfirmationButton from "@/components/shared/confirmation-button";
import { useAuth } from "../context";
import { logout } from "../service";
import { Button } from "@/components/ui/button";

function LogoutButton() {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <ConfirmationButton
      variant="outline"
      confirmation="Are you sure you want to log out?"
      confirmButton={
        <Button onClick={handleLogout} variant="destructive">
          Yes
        </Button>
      }
    >
      Log out
    </ConfirmationButton>
  );
}

export default function AuthButton() {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <LogoutButton />;
  }

  return <Link to="/login">Login</Link>;
}
