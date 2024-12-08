import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ChangeLanguage } from "./ChangeLanguage";
import "../css/layout.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export const Navigation = () => {
  const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const {t} = useTranslation();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);


  return (
    <>
      <Menu
        role="menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={[
          {
            key: "/",
            label: <Link to="/">{t("homepage")}</Link>,
          },
          {
            key: "/find-vet-clinic",
            label: <Link to="/find-vet-clinic">{t("findvet")}</Link>,
          },
          {
            key: "/profile",
            label: <Link to="/profile">{t("profile")}</Link>,
          },
          {
            key: "/pet-first-aid",
            label: <Link to="/pet-first-aid">{t("petfirstaid")}</Link>,
          },
          {
            key: "/change-language",
            label: <ChangeLanguage />,
          },
        ]}
        className="app-menu"
      />
    </>
  );
}