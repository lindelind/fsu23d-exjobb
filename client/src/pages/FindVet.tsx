import { ClinicList } from "../components/ClinicList";
import { useClinics } from "../contexts/ClinicsContext";
import {Spin, Pagination } from "antd";
import { SearchVet } from "../components/SearchVet";
import { useTranslation } from "react-i18next";


export const FindVet = () => {
  const { clinics, loading} = useClinics();
  const {t} = useTranslation();

  return (
    <>
      <h1>{t("findvet-page-title")}</h1>
      <p>
       {t("findvet-page-intro")}
      </p>
    <SearchVet/>
      {loading && <Spin size="large" />}
      {!loading && clinics.length === 0 && <div>{t("clinic_not_found")}</div>}
      {!loading && clinics.length > 0 && (
        <>
          <ClinicList />
          <Pagination />
        </>
      )}
    </>
  );
};
