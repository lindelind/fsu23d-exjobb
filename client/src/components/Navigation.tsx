import {Menu , Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ChangeLanguage } from "./ChangeLanguage";
import "../css/layout.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

export const Navigation = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 605);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 605);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setOpen(!open);

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
        <Link to="/profile" style={{ color: "inherit" }} className="menu-item">
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
    user && {
      key: "/pet-first-aid",
      label: <Link to="/pet-first-aid">{t("petfirstaid")}</Link>,
    },
    {
      key: "/change-language",
      label: <ChangeLanguage />,
    },
    !user
      ? {
          key: "/login",
          label: <LoginModal />,
        }
      : null,
    !user
      ? {
          key: "/register",
          label: <RegisterModal />,
        }
      : null,
  ].filter(Boolean);

  return isMobile ? (
    <>
      <Button
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          width: "50px",
          height: "50px",
          top: "15px",
          right: "15px",
          color: "white",
          border: "none",
          background: "transparent",
          zIndex: 1000,
        }}
      />
      <Drawer
        title={t("menu")}
        placement="left"
        onClose={toggleDrawer}
        open={open}
        style={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          className="app-menu"
          onClick={() => setOpen(false)}
          items={items}
        />
      </Drawer>
    </>
  ) : (
    <Menu
      role="menu"
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      className="app-menu"
      items={items}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    />
  );
};
