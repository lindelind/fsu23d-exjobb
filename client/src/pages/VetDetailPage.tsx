import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { Review, useClinics } from "../contexts/ClinicsContext";
import { Button, Flex, List, message, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { AddReviewsModal } from "../components/AddReviewsModal";
import { useAuth } from "../contexts/AuthContext";
import EnvironmentOutlined from "@ant-design/icons/lib/icons/EnvironmentOutlined";
import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";

export const VetDetailPage = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const { clinic, fetchById, loading, addReview, fetchReviews, reviews, isClinicOpen, saveClinic, removeSavedClinic } =
    useClinics();
  const { t, i18n } = useTranslation();

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

const handleSaveClinic = async () => {
  if (!user?.id || !id) {
    return message.error(t("clinic_save_fail"));
  }
  try {
    await saveClinic(user.id, id);
    message.success(t("clinic_saved"));
  } catch (error: any) {
    const errorMessage =
      error.response?.data.error === "Clinic is already saved"
        ? t("clinic_already_saved")
        : error.response?.status === 404
          ? t("user_not_found")
          : t("clinic_save_fail");

    message.error(errorMessage);
  }
};

const handleRemoveClinic = async() => {
  if(!user?.id || !id) {
    return message.error(t("clinic_removed_fail"))
  }
  try {
    await removeSavedClinic(user.id, id);
    message.success(t("clinic_removed"));
  }catch(error) {
    message.error(t("clinic_removed_fail"))
  }
}
  // const openingHours =
  //   clinic.openinghours?.[i18n.language] ?? clinic.openinghours?.["sv"] ?? [];

  //change back to the above when the data is changed in firestore on the next fetch.
  const openingHours =
    clinic.openinghours?.[i18n.language].weekday_text ?? clinic.openinghours?.["sv"].weekday_text ?? [];

  return (
    <div>
      <h2>{clinic.name}</h2>
      <Button onClick={handleSaveClinic}>{t("save_clinic_btn")}</Button>
      <Button onClick={handleRemoveClinic}>{t("remove_clinic_btn")}</Button>
      <p>
        {(() => {
           const clinicOpen = isClinicOpen(openingHours);

          return (
            <span style={{ color: clinicOpen ? "green" : "red" }}>
              {clinicOpen ? t("open") : t("closed")}
            </span>
          );
        })()}
      </p>
      <p>
        <strong>
          {" "}
          <EnvironmentOutlined style={{ fontSize: "20px" }} />
        </strong>{" "}
        <a
          href={`https://www.google.com/maps?q=${clinic.coordinates?.lat},${clinic.coordinates?.long}`}
          target="_blank"
        >
          {clinic.formatted_address}
        </a>
      </p>
      <p>
        <strong>
          <PhoneOutlined style={{ fontSize: "20px" }} />
        </strong>{" "}
        {clinic.phone_number ? (
          <a href={`tel:${clinic.phone_number}`}>{clinic.phone_number}</a>
        ) : (
          t("clinic_info_null")
        )}
      </p>
      <p>
        <strong>
          <img src="/website.png" alt="" width={"24px"} />
        </strong>{" "}
        {clinic.website ? (
          <a href={clinic.website} target="_blank">
            {clinic.website}
          </a>
        ) : (
          t("clinic_info_null")
        )}
      </p>
      <h3>{t("opening_hours")}</h3>
      {openingHours.length > 0 ? (
        <List
          size="small"
          dataSource={openingHours}
          renderItem={(hours: any) => <p>{hours}</p>}
        />
      ) : (
        <p>{t("no_opening_hours")}</p>
      )}

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
                <p
                  style={{
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    margin: 0,
                  }}
                >
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
