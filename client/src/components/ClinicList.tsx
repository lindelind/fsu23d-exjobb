import { List, Pagination, Rate } from "antd";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";
import EnvironmentOutlined from "@ant-design/icons/lib/icons/EnvironmentOutlined";

export const ClinicList = () => {
  const { clinics, isClinicOpen } = useClinics();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const sortedClinics = clinics
    .map((clinic) => {
    
      const openingHoursCheck = clinic.openinghours?.["sv"]?.periods ?? [];
      isClinicOpen(openingHoursCheck);
      return { ...clinic, isOpen: isClinicOpen(openingHoursCheck) };
    })
    .sort((a, b) => Number(b.isOpen) - Number(a.isOpen));

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedClinics = sortedClinics.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <List
        bordered
        size="small"
        dataSource={paginatedClinics}
        renderItem={(clinic) => (
          <List.Item
            key={clinic.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/vet-clinic/" + clinic.id)}
          >
            <div>
              <h3>{clinic.name}</h3>
              <Rate disabled allowHalf defaultValue={clinic.rating} />
              <p>
                <strong>
                  <EnvironmentOutlined style={{ fontSize: "20px" }} />
                </strong>{" "}
                {/* <a
                  href={`https://www.google.com/maps?q=${clinic.coordinates?.lat},${clinic.coordinates?.long}`}
                  target="_blank"
                > */}
                  {clinic.formatted_address}
                {/* </a> */}
              </p>
              {clinic.phone_number && (
                <>
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
              </p> </> )}
               {clinic.website && (
                <>
              <p>
                <strong><img src="/website.png" alt="" width={"24px"} /></strong>{" "}
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
              </p> </> )}
              {clinic.distance && (
                <p>
                  <strong>
                   {t("distance")}
                  </strong>{" "}
                  {clinic.distance} km
                </p>
              )}
              <p style={{ color: clinic.isOpen ? "green" : "red" }}>
                <strong>{clinic.isOpen ? t("open") : t("closed")}</strong>
              </p>
            </div>
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={sortedClinics.length}
        onChange={handlePageChange}
        style={{ marginTop: "16px", textAlign: "center" }}
      />
    </>
  );
};