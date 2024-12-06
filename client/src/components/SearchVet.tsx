import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Input, message, Select, Modal } from "antd";
import { useState } from "react";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";

export const SearchVet = () => {
  const { Option } = Select;
  const { fetchByCity, fetchByLocation } = useClinics();
  const [searchType, setSearchType] = useState("city");
    const [open, setOpen] = useState(false);
  const  [radius, setRadius] = useState(20);
  const [userLocation, setUserLocation] = useState<{lat: number; long: number;} | null>(null);
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    if (searchType === "city") {
      fetchByCity(value);
      navigate("/find-vet-clinic/");
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      message.error("Platsinfo är inte tillgängligt");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log("User location:", { lat, long });
        setUserLocation({ lat, long });
        setOpen(true);
      },
      (error) => {
        message.error(
          "Kunde inte hämta plats. Kontrollera dina inställningar."
        );
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleOk = () => {
    if (userLocation) {
      console.log("Selected radius:", radius);
      fetchByLocation(userLocation.lat, userLocation.long, radius);
      navigate("/find-vet-clinic/");
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Input.Search
        placeholder={searchType === "city" ? "Sök stad" : "Sök namn"}
        enterButton={<SearchOutlined />}
        size="large"
        addonBefore={
          <Select
            defaultValue="Stad"
            onChange={setSearchType}
            style={{ width: 80 }}
          >
            <Option value="city">Stad</Option>
            <Option value="name">Namn</Option>
            <Option value="län">Län</Option>
          </Select>
        }
        suffix={
          <EnvironmentOutlined
            style={{ cursor: "pointer" }}
            onClick={getUserLocation}
          />
        }
        onSearch={onSearch}
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />

      <Modal
        title="Välj avstånd till veterinär"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{maxWidth: "400px" }}
      >
        <p>
          Svaren filtreras alltid för att visa den klinik som ligger närmast dig
          först.
        </p>
        <Select
          defaultValue={20}
          style={{ width: "100%" }}
          onChange={(value) => setRadius(value)}
        >
          <Option value={5}>5 km</Option>
          <Option value={10}>10 km</Option>
          <Option value={20}>20 km</Option>
          <Option value={50}>50 km</Option>
        </Select>
      </Modal>
    </>
  );
};
