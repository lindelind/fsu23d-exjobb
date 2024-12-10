import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Review, useClinics } from "../contexts/ClinicsContext";
import { Flex, List, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { AddReviewsModal } from "../components/AddReviewsModal";

export const VetDetailPage = () => {
  const { id } = useParams();
  const { clinic, fetchById, loading, addReview, fetchReviews, reviews } =
    useClinics();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      fetchById(id);
      fetchReviews(id);
    }
  }, [id, fetchById, fetchReviews]);

  const submitReview = async (review: Review) => {
    try {
      await addReview(review);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Flex>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!clinic) {
    return <p>{t("clinic_not_found")}</p>;
  }

  return (
    <div>
      <h2>{clinic.name}</h2>
      <p>{clinic.formatted_address}</p>

      <AddReviewsModal clinicId={clinic.id} onSubmit={submitReview} />

      <h3>{t("reviews")}</h3>
      {reviews.length > 0 ? (
        <List
          bordered
          size="small"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item style={{ background: "#e6f4ff" }}>
              <div style={{ width: "100%" }}>
                <p>
                  <strong>{t("rating")}:</strong> {review.rating}
                </p>
                <p>
                  <strong>{t("comment")}:</strong> {review.comment}
                </p>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <p>{t("no_reviews")}</p>
      )}
    </div>
  );
};
