import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface Clinic {
  id: string;
  name: string;
  address: {
    streetAddress: string;
    city: string;
    zip: string;
    country: string;
  };
  formatted_address: string;
  phone_number: string | null;
  website: string | null;
  coordinates: {
    lat: number;
    long: number;
  };
  openinghours: string[] | null;
}

interface ClinicsContextProps {
  clinics: Clinic[];
  loading: boolean;
  fetchByCity: (city?: string) => Promise<void>;
}

const ClinicsContext = createContext<ClinicsContextProps | undefined>(
  undefined
);

export const ClinicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchByCity = async (city = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/vet-clinics?city=${city}`  //TODO: ändra cityparametern så den är dynamisk beroende på vad man selectar att söka på, eller skapa separata funktioner?
      );
      const data = response.data

      if (data.success) {
        setClinics(data.data);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClinicsContext.Provider
      value={{
        clinics,
        loading,
        fetchByCity,
      }}
    >
      {children}
    </ClinicsContext.Provider>
  );
};

export const useClinics = () => {
  const context = useContext(ClinicsContext);
  if (!context) {
    throw new Error("useClinics must be used within a ClinicsProvider");
  }
  return context;
};
