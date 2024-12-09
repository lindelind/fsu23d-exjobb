import {Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ChangeLanguage } from "./ChangeLanguage";
import "../css/layout.css";
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

  const items = [
    {
      key: "/",
      label: <Link to="/">{t("homepage")}</Link>,
    },
    {
      key: "/find-vet-clinic",
      label: <Link to="/find-vet-clinic">{t("findvet")}</Link>,
    },
    user && {
      key: "/profile",
      label: (
        <Link to="/profile" style={{color: "inherit"}} className="menu-item">
          {t("profile")}
        </Link>
      ),
      children: [
        {
          key: "/saved-clinics",
          label: <Link to="/saved-clinics">{t("saved_clinics_nav")}</Link>,
        },
        {
          key: "/logout",
          label: <span onClick={logout}>{t("logout")}</span>,
        },
      ],
    },
    {
      key: "/pet-first-aid",
      label: <Link to="/pet-first-aid">{t("petfirstaid")}</Link>,
    },
    {
      key: "/change-language",
      label: <ChangeLanguage />,
    },
  ].filter(Boolean);

  return (
      <Menu
        role="menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        className="app-menu"
        items={items}
      />
  
  );
};
