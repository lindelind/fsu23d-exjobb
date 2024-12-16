import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";

export interface Clinic {
  openinghours?: { [key: string]: string[] } | null;
  id: string;
  name: string;
  address: {
    streetAddress: string;
    city: string;
    zip: string;
    country: string;
  };
  distance?: string;
  formatted_address: string;
  phone_number: string | null;
  website: string | null;
  coordinates: {
    lat: number;
    long: number;
  };
}

export interface Review {
  clinicId: string;
  rating: number, 
  comment: string;
  userEmail: string;
}

interface ClinicsContextProps {
  reviews: Review[];
  clinics: Clinic[];
  clinic: Clinic | null;
  loading: boolean;
  fetchByCity: (city?: string) => Promise<void>;
  fetchByLocation: (lat: number, long: number, radius: number) => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  fetchReviews: (clinicId: string) => Promise<void>;
  isClinicOpen: (openinghours: string[] | null) => boolean;
}

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://fsu23d-exjobb.onrender.com/api"
    : "http://localhost:3000/api";

console.log(`API_URL is set to: ${API_URL}`);



const ClinicsContext = createContext<ClinicsContextProps | undefined>(
  undefined
);

export const ClinicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchByCity = async (city = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/vet-clinics?city=${city}` //TODO: ändra cityparametern så den är dynamisk beroende på vad man selectar att söka på, eller skapa separata funktioner?
      );
      const data = response.data;

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
    setLoading(true);
    try {
      console.log("Fetching by location:", { lat, long, radius });
      const response = await axios.get(
        `${API_URL}/vet-clinics-location?lat=${lat}&long=${long}&radius=${radius}`
      );
      console.log("Response data:", response.data);

      const data = response.data;
      setClinics(data.data);
    } catch (error) {
      console.error("Error fetching clinics by coordinates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get<{ success: boolean; data: Clinic[] }>(
        `${API_URL}/vet-clinics/${id}`
      );
      setClinic(response.data.data[0] || null);
    } catch (error) {
      console.error("Error fetching clinic by ID:", error);
      setClinic(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const addReview = async (review: Review) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/vet-clinics/${review.clinicId}/reviews`,
        {
          rating: review.rating,
          comment: review.comment,
          user: review.userEmail,
        }
      );

      if (response.data.success) {
        console.log("Review added successfully:", response.data);
      } else {
        console.error("Failed to add review:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/vet-clinics/${id}/reviews`);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);


  const isClinicOpen = (openinghours: string[] | null): boolean => {
    if (!openinghours?.length) {
      return false;
    }

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentDay = now
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const days: Record<string, string> = {
      monday: "måndag",
      tuesday: "tisdag",
      wednesday: "onsdag",
      thursday: "torsdag",
      friday: "fredag",
      saturday: "lördag",
      sunday: "söndag",
    };

    const todayHours = openinghours.find((openhours) => {
      const day = openhours.split(":")[0].toLowerCase();
      return day === currentDay || day === days[currentDay];
    });


    if (!todayHours) {
      return false;
    }

    //om öppettiderna är uppdelat i två
    const timePeriods = todayHours.replace(/^[^:]+:\s*/, "").split(/,\s*/);
    // console.log("Tider:", timePeriods);

    const status = timePeriods[0].toLowerCase();
    if (["closed", "stängt"].includes(status)) {
      return false;
    }
    if (["open 24 hours", "öppet dygnet runt"].includes(status)) {
      return true;
    }

    const parseTime = (time: string): { hours: number; minutes: number } => {
      const timeMatch = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)?/i);
      if (!timeMatch) {
        console.error(`Invalid time format: ${time}`);
        throw new Error(`Invalid time format: ${time}`);
      }

      let [hours, minutes] = timeMatch.slice(1, 3).map(Number);
      const period = timeMatch[3]?.toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const isOpen = timePeriods.some((period) => {
      const [open, close] = period
        .split("–")
        .map((time) => parseTime(time.trim()));

      
      if (currentHours > open.hours && currentHours < close.hours) return true;
      if (currentHours === open.hours && currentMinutes >= open.minutes)
        return true;
      if (currentHours === close.hours && currentMinutes <= close.minutes)
        return true;

      return false;
    });

    console.log("Is clinic open:", isOpen);
    return isOpen;
  };

  return (
    <ClinicsContext.Provider
      value={{
        clinics,
        reviews,
        clinic,
        loading,
        fetchByCity,
        fetchByLocation,
        fetchById,
        addReview,
        fetchReviews,
        isClinicOpen,
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
