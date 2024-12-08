
import { List } from "antd";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ClinicList = () => {
  const { clinics } = useClinics();
    const navigate = useNavigate();
    const { t } = useTranslation();

  return (
    <List
      bordered
      size="small"
      dataSource={clinics}
      renderItem={(clinic) => (
        <List.Item
          key={clinic.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/vet-clinic/" + clinic.id)}
        >
          <div>
            <h3>{clinic.name}</h3>
            <p>
              <strong>{t("clinic_address")}:</strong>{" "}
              <a
                href={`https://www.google.com/maps?q=${clinic.coordinates.lat},${clinic.coordinates.long}`}
                target="_blank"
              >
                {clinic.formatted_address}
              </a>
            </p>
            <p>
              <strong>{t("clinic_phone")}:</strong>{" "}
              {clinic.phone_number ? (
                <a href={`tel:${clinic.phone_number}`}>{clinic.phone_number}</a>
              ) : (
                "Finns ej"
              )}
            </p>
            <p>
              <strong>{t("clinic_website")}:</strong>{" "}
              {clinic.website ? (
                <a href={clinic.website} target="_blank">
                  {clinic.website}
                </a>
              ) : (
                "Finns ej"
              )}
            </p>
            {clinic.distance && (
              <p>
                <strong>{t("distance")}:</strong>{" "}
                {clinic.distance} km
              </p>
            )}
          </div>
        </List.Item>
      )}
    />
  );
};
