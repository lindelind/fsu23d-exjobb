import { useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { registerUser } from "../firebase-auth/authService";
import { useTranslation } from "react-i18next";

export const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
   const { t } = useTranslation();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setConfirmLoading(true);
    try {
      
       await registerUser(
        values.email,
        values.password,
        values.name
      );

      message.success(t("register_success"));
      setOpen(false);
    } catch (error: any) {
      console.error("Error during registration:", error);
      message.error(error.message || (t("register_fail")));
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
        {t("register")}
      </span>
      <Modal
        title={t("register")}
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          name="register"
          onFinish={handleOk}
          layout="vertical"
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            label={t("name")}
            name="name"
            rules={[{ required: true, message: t("required_name") }]}
          >
            <Input placeholder={t("name_placeholder")} />
          </Form.Item>
          <Form.Item
            label={t("email")}
            name="email"
            rules={[
              { required: true, message: t("email_required_message") },
              { type: "email", message: t("email_type_message") },
            ]}
          >
            <Input placeholder={t("email_placeholder")} />
          </Form.Item>
          <Form.Item
            label={t("password")}
            name="password"
            rules={[
              { required: true, message: t("password_required_message") },
              { min: 6, message: t("password_least_characters") },
            ]}
          >
            <Input.Password placeholder={t("password_placeholder")} />
          </Form.Item>
          <Form.Item
            label={t("confirm_password")}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: t("password_confirm_message") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("password_dont_match")));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t("confirm_password_placeholder")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {t("register")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
