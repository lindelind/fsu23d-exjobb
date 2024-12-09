import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/LoginModal";
import { Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { user, loading } = useAuth();
  const {t} = useTranslation();

  if (loading) {
    return <p><Flex>
      <Spin size="large"/>
        </Flex></p>; 
  }

  return (
    <>
      {!user && (
        <>
          <LoginModal />
        </>
      )}
      {user && (
        <>
        <h3>{t("my_profile")}</h3>
          <p>{user.name}</p>
        </>
      )}
    </>
  );
};
