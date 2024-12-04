
import { List } from "antd";
import { useClinics } from "../contexts/ClinicsContext";

export const ClinicList = () => {
  const { clinics } = useClinics();

  return (
    <List
      bordered
      size="small"
      dataSource={clinics}
      renderItem={(clinic) => (
        <List.Item key={clinic.id}>
          <div>
            <h3>{clinic.name}</h3>
            <p>
              Adress:{" "}
              <a
                href={`https://www.google.com/maps?q=${clinic.coordinates.lat},${clinic.coordinates.long}`}
                target="_blank"
              >
                {clinic.formatted_address}
              </a>
            </p>
            <p>
              Telefon:{" "}
              {clinic.phone_number ? (
                <a href={`tel:${clinic.phone_number}`}>{clinic.phone_number}</a>
              ) : (
                "Finns ej"
              )}
            </p>
            <p>
              Hemsida:{" "}
              {clinic.website ? (
                <a href={clinic.website} target="_blank">
                  {clinic.website}
                </a>
              ) : (
                "Finns ej"
              )}
            </p>
          </div>
        </List.Item>
      )}
    />
  );
};
