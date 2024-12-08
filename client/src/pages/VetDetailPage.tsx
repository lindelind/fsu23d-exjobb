import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClinics } from "../contexts/ClinicsContext";
import { Flex, Spin } from "antd";

export const VetDetailPage = () => {
  const { id } = useParams();
  const { clinic, fetchById, loading } = useClinics();

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
    return <p>Kliniken hittades inte.</p>;
  }

  return (
    <div>
      <h2>{clinic.name}</h2>
      <p>{clinic.formatted_address}</p>
    </div>
  );
};
