import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/LoginModal";
import { Button, Card, Spin } from "antd";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <p>
        <Spin size="large" />
      </p>
    );
  }

  return (
    <>
      {!user ? (
        <>
          <p>{t("not_logged_in")}</p>
          <Button type="primary"><LoginModal /></Button>
        </>
      ) : (
        <Card
          title={t("my_profile")}
          bordered={false}
          style={{
            width: 300,
            margin: "0 auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>{t("name")}: </strong>
            {user.name}
          </p>
          <p>
            <strong>{t("email")}: </strong>
            {user.email}
          </p>
        </Card>
      )}
    </>
  );
};
