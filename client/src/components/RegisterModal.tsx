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

      message.success("Registration successful!");
      setOpen(false);
    } catch (error: any) {
      console.error("Error during registration:", error);
      message.error(error.message || "Registration failed. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        {t("register")}
      </Button>
      <Modal
        title="Register"
        open={open}
        onCancel={handleCancel}
        footer={null}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
