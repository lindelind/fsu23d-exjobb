
import { Button } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";


export const LogoutButton = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      {t("logout")}
    </Button>
  );
};

