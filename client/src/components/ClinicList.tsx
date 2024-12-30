import { List } from "antd";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ClinicList = () => {
  const { clinics, isClinicOpen } = useClinics();
  const navigate = useNavigate();
  const { t} = useTranslation();

 const sortedClinics = clinics
   .map((clinic) => {
    
       const openingHoursCheck = clinic.openinghours?.["sv"]?.periods ?? [];
         isClinicOpen(openingHoursCheck);
     return { ...clinic, isOpen: isClinicOpen(openingHoursCheck) };
   })
   .sort((a, b) => Number(b.isOpen) - Number(a.isOpen));

  return (
    <List
      bordered
      size="small"
      dataSource={sortedClinics}
      renderItem={(clinic) => {
        return (
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
                  <a href={`tel:${clinic.phone_number}`}>
                    {clinic.phone_number}
                  </a>
                ) : (
                  t("clinic_info_null")
                )}
              </p>
              <p>
                <strong>{t("clinic_website")}:</strong>{" "}
                {clinic.website ? (
                  <a
                    href={clinic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {clinic.website}
                  </a>
                ) : (
                  t("clinic_info_null")
                )}
              </p>
              {clinic.distance && (
                <p>
                  <strong>{t("distance")}:</strong> {clinic.distance} km
                </p>
              )}
              <p style={{ color: clinic.isOpen ? "green" : "red" }}>
                <strong>{clinic.isOpen ? t("open") : t("closed")}</strong>
              </p>
            </div>
          </List.Item>
        );
      }}
    />
  );
};
