import { useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { loginUser, fetchIdToken } from "../firebase-auth/authService";
import axios from "axios";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (values: { email: string; password: string}) => {
    setConfirmLoading(true);
    try {
      
      await loginUser(values.email, values.password);
      message.success("Login successful!");

      
      const idToken = await fetchIdToken();
      console.log("ID Token fetched:", idToken);

      const response = await axios.get("http://localhost:3000/api/user-data", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log("User data from backend:", response.data);
      setUserData(response.data); 

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
      {userData ? (
        <h3>Inloggad som: {userData.name}</h3>
      ) : (
        <h3>Inte inloggad</h3>
      )}

      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal title="Login" open={open} onCancel={handleCancel} footer={null}>
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
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
