import { Menu } from "antd";
import { Link } from "react-router-dom";

export const Navigation = () => {

    return (
        <Menu
        role="menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={[
            {
            key: "1",
            label: <Link to="/">Startsida</Link>,
            },
            {
            key: "2",
            label: <Link to="/find-vet-clinic">Hitta Veterinär</Link>,
            },
            {
            key: "3",
            label: <Link to="/profile">Profil</Link>,
            },
            {
            key: "4",
            label: <Link to="/pet-first-aid">Pet First Aid</Link>,
            },
        ]}
        className="app-menu"
        />
    );
}