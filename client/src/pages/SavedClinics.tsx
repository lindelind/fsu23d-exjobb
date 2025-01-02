import { useEffect } from "react";
import { List, Spin, Alert } from "antd";
import { useClinics } from "../contexts/ClinicsContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EnvironmentOutlined from "@ant-design/icons/lib/icons/EnvironmentOutlined";
import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";

export const SavedClinics = () => {

  const { clinics, fetchSavedClinics, loading, isClinicOpen } = useClinics();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user?.id) {
      fetchSavedClinics(user.id);
    }
  }, [fetchSavedClinics, user?.id]);

  if (!user) {
    return (
      <Alert
        message={t("not_logged_in_alert")}
      />
    );
  }

  if (loading) {
    return <Spin size="large" />;
  }

  if (clinics.length === 0) {
    return <p>{t("no_saved_clinics")}</p>;
  }

  const sortedClinics = clinics
    .map((clinic) => {
      const openingHoursCheck = clinic.openinghours?.["sv"]?.periods ?? [];
      return { ...clinic, isOpen: isClinicOpen(openingHoursCheck) };
    })
    .sort((a, b) => Number(b.isOpen) - Number(a.isOpen));

  return (
    <div>
      <h2>{t("saved_clinics")}</h2>
      <List
        bordered
        dataSource={sortedClinics}
        renderItem={(clinic) => (
          <List.Item
            key={clinic.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/vet-clinic/${clinic.id}`)}
          >
            <div>
              <h3>{clinic.name}</h3>
              <p>
                <strong>
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
                  <a href={`tel:${clinic.phone_number}`}>
                    {clinic.phone_number}
                  </a>
                ) : (
                  t("clinic_info_null")
                )}
              </p>
              <p>
                <strong>
                  <img src="/website.png" alt="" width={"24px"} />
                </strong>{" "}
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
        )}
      />
    </div>
  );
};
