import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Input, message, Select, Modal } from "antd";
import { useState } from "react";
import { useClinics } from "../contexts/ClinicsContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SearchVet = () => {
  const { Option } = Select;
  const { fetchByWildSearch, fetchByLocation } = useClinics();
    const [open, setOpen] = useState(false);
  const  [radius, setRadius] = useState(20);
  const [userLocation, setUserLocation] = useState<{lat: number; long: number;} | null>(null);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const onSearch = (value: string) => {
      fetchByWildSearch(value);
      navigate("/find-vet-clinic/");
    }
  

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      message.error(t("location_not_available"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setUserLocation({ lat, long });
        setOpen(true);
      },
      (error) => {
        message.error(
          t("location_error_message")
        );
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleOk = () => {
    if (userLocation) {
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
        placeholder={t("wild_search")}
        enterButton={<SearchOutlined />}
        size="large"
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
        title={t("choose_distance")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
      >
        <p>{t("choose_distance_info")}</p>
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
