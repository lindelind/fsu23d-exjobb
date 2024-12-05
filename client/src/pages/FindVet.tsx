import { ClinicList } from "../components/ClinicList";
import { useClinics } from "../contexts/ClinicsContext";
import {Spin, Pagination } from "antd";
import { SearchVet } from "../components/SearchVet";


export const FindVet = () => {
  const { clinics, loading} = useClinics();

  return (
    <>
      <h1>Hitta Veterinär</h1>
      <p>
        Här kan du söka och hitta kontaktuppgifter till din närmsta veterinär.
      </p>
    <SearchVet/>
      {loading && <Spin size="large" />}
      {!loading && clinics.length === 0 && <div>Inga kliniker hittades.</div>}
      {!loading && clinics.length > 0 && (
        <>
          <ClinicList />
          <Pagination />
        </>
      )}
    </>
  );
};
