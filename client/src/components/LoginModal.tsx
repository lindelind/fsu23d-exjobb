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
      message.success("Du är nu inloggad!");
      setOpen(false);
    } catch (error: any) {
      console.error("Login failed:", error);
      message.error(error.message || "Login failed. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("login")}
      </Button>
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" aria-label="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input.Password
              placeholder="Enter your password"
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
