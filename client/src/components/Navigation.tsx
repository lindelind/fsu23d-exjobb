import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ChangeLanguage } from "./ChangeLanguage";
import "../css/layout.css"
import { useEffect, useState } from "react";


export const Navigation = () => {
  const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

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
            label: <Link to="/">Startsida</Link>,
          },
          {
            key: "/find-vet-clinic",
            label: <Link to="/find-vet-clinic">Hitta Veterinär</Link>,
          },
          {
            key: "/profile",
            label: <Link to="/profile">Profil</Link>,
          },
          {
            key: "/pet-first-aid",
            label: <Link to="/pet-first-aid">Pet First Aid</Link>,
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