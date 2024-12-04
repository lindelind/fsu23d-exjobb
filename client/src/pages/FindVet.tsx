import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { ClinicList } from "../components/ClinicList";
import { useClinics } from "../contexts/ClinicsContext";
import { Input,Pagination, Spin } from "antd";

export const FindVet = () => {
  const { clinics, loading, fetchByCity } =
    useClinics();

  const onSearch = (value: string) => {
    fetchByCity(value);
  };


  return (
    <div>
      <h1>Hitta Veterinär</h1>
      <p>
        Här kan du söka och hitta kontaktuppgifter till din närmsta veterinär.
      </p>
      <Input.Search //TODO: lägg till möjlighet att selecta om man ska söka på city, name etc
        placeholder="Sök veterinär/klinik"
        enterButton={<SearchOutlined />}
        size="large"
        suffix={
          <EnvironmentOutlined
            style={{ cursor: "pointer" }}
            // onClick={getLocation} TODO: Skapa funktion för att hämta användarens location och hämta närmaste kliniker baserat på det
          />
        }
        onSearch={onSearch}
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />
      {loading && <Spin size="large" />}
      {!loading && clinics.length === 0 && <div>Inga veterinärkliniker hittades.</div>}
      {!loading && clinics.length > 0 && (
        <>
          <ClinicList />
          <Pagination />
        </> //TODO:lägg till möjlighet att gå till nästa sida ( ca 5 kliniker per sida)
      )}
    </div>
  );
};
