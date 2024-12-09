import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ChangeLanguage } from "./ChangeLanguage";
import "../css/layout.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";


export const Navigation = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { t } = useTranslation();
   const { logout, user } = useAuth();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  return (
    <Menu
      role="menu"
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      className="app-menu"
    >
      <Menu.Item key="/">
        <Link to="/">{t("homepage")}</Link>
      </Menu.Item>

      <Menu.Item key="/find-vet-clinic">
        <Link to="/find-vet-clinic">{t("findvet")}</Link>
      </Menu.Item>

      {user && (
        <>
          <Menu.SubMenu
            key="/profile"
            title={<Link to="/profile">{t("profile")}</Link>}
          >
            <Menu.Item key="/saved-clinics">
              <Link to="/saved-clinics">{t("saved_clinics_nav")}</Link>
            </Menu.Item>
            <Menu.Item key="/logout" onClick={logout}>
              {t("logout")}
            </Menu.Item>
          </Menu.SubMenu>
        </>
      )}

      <Menu.Item key="/pet-first-aid">
        <Link to="/pet-first-aid">{t("petfirstaid")}</Link>
      </Menu.Item>

      <Menu.Item key="/change-language">
        <ChangeLanguage />
      </Menu.Item>
    </Menu>
  );
};