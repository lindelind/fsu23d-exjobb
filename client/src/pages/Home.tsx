import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { RegisterModal } from "../components/RegisterModal";
import {LoginModal} from "../components/LoginModal";


export const Home = () => {
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
    <>
      <RegisterModal />
      <LoginModal/>
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
    </>
  );
};
