import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClinics } from "../contexts/ClinicsContext";
import { Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";

export const VetDetailPage = () => {
  const { id } = useParams();
  const { clinic, fetchById, loading } = useClinics();
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

  return (
    <div>
      <h2>{clinic.name}</h2>
      <p>{clinic.formatted_address}</p>
    </div>
  );
};
