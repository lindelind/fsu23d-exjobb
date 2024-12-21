import { useState } from "react";
import { Button, Modal, Input, Form, message} from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (values: { email: string; password: string }) => {
    setConfirmLoading(true);
    try {
      await login(values.email, values.password);
      message.success(t("login_success"));
      setOpen(false);
    } catch (error: any) {
      console.error("Login failed:", error);
      message.error(error.message || t("login_fail"));
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={showModal}>
        {t("login")}
      </span>
      <Modal
        title="Login"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          name="login"
          onFinish={handleOk}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label={t("email")}
            name="email"
            rules={[
              { required: true, message: t("email_required_message") },
              { type: "email", message: t("email_type_message") },
            ]}
          >
            <Input placeholder={t("email_placeholder")} aria-label="Email" />
          </Form.Item>
          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true, message: t("password_required_message") }]}
          >
            <Input.Password
              placeholder={t("password_placeholder")}
              aria-label="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
