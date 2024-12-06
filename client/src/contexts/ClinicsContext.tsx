import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";

export interface Clinic {
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
  clinic: Clinic | null;
  loading: boolean;
  fetchByCity: (city?: string) => Promise<void>;
  fetchByLocation: (lat: number, long: number, radius: number) => Promise<void>;
  fetchById: (id: string) => Promise<void>;
}

const ClinicsContext = createContext<ClinicsContextProps | undefined>(
  undefined
);

export const ClinicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [clinic, setClinic] = useState<Clinic | null>(null);

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


  const fetchByLocation = async (lat: number, long: number, radius: number) => {
  try {
    console.log("Fetching by location:", { lat, long, radius });
    const response = await axios.get(
      `http://localhost:3000/api/vet-clinics-location?lat=${lat}&long=${long}&radius=${radius}`
    );
    console.log("Response data:", response.data);

    const data = response.data;
    setClinics(data.data);
  } catch (error) {
    console.error("Error fetching clinics by coordinates:", error);
  }
};

const fetchById = useCallback(async (id: string) => {
  setLoading(true);
  try {
    const response = await axios.get<{ success: boolean; data: Clinic[] }>(
      `http://localhost:3000/api/vet-clinics/${id}`
    );
    setClinic(response.data.data[0] || null);
  } catch (error) {
    console.error("Error fetching clinic by ID:", error);
    setClinic(null);
  } finally {
    setLoading(false);
  }
}, []);



  return (
    <ClinicsContext.Provider
      value={{
        clinics,
        clinic,
        loading,
        fetchByCity,
        fetchByLocation,
        fetchById
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
