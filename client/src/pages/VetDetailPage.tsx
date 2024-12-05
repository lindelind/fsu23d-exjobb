import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clinic } from "../contexts/ClinicsContext";
import { Flex, Spin } from "antd";

export const VetDetailPage = () => {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getClinic = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Clinic[] }>(
          "http://localhost:3000/api/vet-clinics/" + id
        );
          setClinic(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching clinic:", error);
      } finally {
        setLoading(false);
      }
    };

    getClinic();
  }, [id]);

  if (loading) {
    return (
      <p>
        <Flex align="center" gap="middle">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Flex>
      </p>
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
