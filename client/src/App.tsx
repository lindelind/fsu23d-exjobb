import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import "./App.css";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [petFirstAid, setPetFirstAid] = useState<any>([]);
  const [places, setPlaces] = useState<any>([]);

  const fetchPetFirstAid = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pet-first-aid"
      );
      setPetFirstAid(response.data);
    } catch (error) {
      console.error("Error fetching Pet First Aid data:", error);
    }
  };

  
  const fetchPlaces = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/places", {
        params: { query: "Veterinärklinik" },
      });
      setPlaces(response.data.results);
    } catch (error) {
      console.error("Error fetching Places data:", error);
    }
  };

  return (
    <Layout>
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", label: "Startsida" },
            { key: "2", label: "Hitta Veterinär" },
            { key: "3", label: "Profil" },
            { key: "4", label: "Pet First Aid" },
          ]}
          className="app-menu"
        />
      </Header>
      <Content className="app-content">
        <div className="content-area">
          <Button type="primary" onClick={fetchPetFirstAid}>
            Hämta Pet First Aid
          </Button>
          <ul>
            {petFirstAid.map((doc: any) => (
              <li key={doc.id}>
                {doc.query} ({doc.response})
              </li>
            ))}
          </ul>

          <Button type="primary" onClick={fetchPlaces}>
            Hämta Places
          </Button>
          <div>
            <h1>Places</h1>
            <ul>
              {places.map((place: any) => (
                <li key={place.place_id}>{place.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </Content>
      <Footer className="app-footer">
        HittaVet ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
