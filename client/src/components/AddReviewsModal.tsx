import { useState } from "react";
import { Button, Modal, Input, Form, message, Rate } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const AddReviewsModal = ({
  clinicId,
  onSubmit,
}: {
  clinicId: string;
  onSubmit: (review: {
    clinicId: string;
    rating: number;
    comment: string;
    userEmail: string;
  }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();

  const showModal = () => {
    if (!user?.email) {
      message.error(t("login_required"));
      return;
    }
    setOpen(true);
  };

  const handleOk = async (values: { rating: number; comment: string }) => {
    if (!user?.email) {
      message.error(t("login_required"));
      return;
    }

    setConfirmLoading(true);
    try {
      const review = {
        clinicId,
        rating: values.rating,
        comment: values.comment,
        userEmail: user.email, 
      };
      onSubmit(review);
      message.success(t("review_submitted"));
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to submit review:", error);
      message.error(t("review_failed"));
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
        {t("add_review")}
      </Button>
      <Modal
        title={t("add_review_title")}
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          name="add-review"
          onFinish={handleOk}
          layout="vertical"
          initialValues={{ rating: 0, comment: "" }}
        >
          <Form.Item
            label={t("rating")}
            name="rating"
            rules={[{ required: true, message: t("rating_required") }]}
          >
            <Rate allowHalf aria-label="Rating" />
          </Form.Item>
          <Form.Item
            label={t("comment")}
            name="comment"
            rules={[{ required: true, message: t("comment_required") }]}
          >
            <Input.TextArea
              placeholder={t("comment_placeholder")}
              aria-label="Comment"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {t("submit_review")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
