import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Review, useClinics } from "../contexts/ClinicsContext";
import { Flex, Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import {AddReviewsModal} from "../components/AddReviewsModal";

export const VetDetailPage = () => {
  const { id } = useParams();
  const { clinic, fetchById, loading, addReview } = useClinics();
  const {t} = useTranslation();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  if (loading) {
    return (
      <Flex align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (!clinic) {
    return <p>{t("clinic_not_found")}</p>;
  }

   const submitReview = async (review: Review) => {
     try {
       await addReview(review);
     } catch (error) {
       console.error(error);
     }
   };


  return (
    <div>
      <h2>{clinic.name}</h2>
      <p>{clinic.formatted_address}</p>

      <AddReviewsModal clinicId={clinic.id} onSubmit={submitReview} />
    </div>
  );
};
