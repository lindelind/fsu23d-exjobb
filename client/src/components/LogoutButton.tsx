
import { Button } from "antd";
import { useAuth } from "../contexts/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

