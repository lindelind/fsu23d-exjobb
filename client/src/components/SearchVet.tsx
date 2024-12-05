import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { useState } from "react";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";

export const SearchVet = () => {

const { Option } = Select;
const {fetchByCity } = useClinics();
const [searchType, setSearchType] = useState("city");
 const navigate = useNavigate();

const onSearch = (value: string) => {
  if (searchType === "city") {
    fetchByCity(value);
    navigate("/find-vet-clinic/")

  }
};

return (
<>
<Input.Search
  placeholder="Sök veterinär/klinik"
  enterButton={<SearchOutlined />}
  size="large"
  addonBefore={
    <Select defaultValue="Sök" onChange={setSearchType} style={{ width: 80 }}>
      <Option value="city">Stad</Option>
      <Option value="name">Namn</Option>
      <Option value="län">Län</Option>
    </Select>
  }
  suffix={
    <EnvironmentOutlined
      style={{ cursor: "pointer" }}
      // onClick={getLocation} TODO: Skapa funktion för att hämta användarens location och hämta närmsta kliniker baserat på det
    />
  }
  onSearch={onSearch}
  style={{ marginBottom: "20px", maxWidth: "400px" }}
/>
</>
)
}



