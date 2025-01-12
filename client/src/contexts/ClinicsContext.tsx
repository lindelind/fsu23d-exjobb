import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";

export interface Clinic {
 openinghours?: { [key: string]: {
    weekday_text: string[];
    periods?: {
      close: { day: number; time: string };
      open: { day: number; time: string };
    }[];
  };
} | null,
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
  rating: number;
  user_ratings_total: number;
  coordinates?: {
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
  fetchByWildSearch: (query?: string) => Promise<void>;
  fetchByLocation: (lat: number, long: number, radius: number) => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  fetchReviews: (clinicId: string) => Promise<void>;
  isClinicOpen: (
    openinghours:
      | {
          open: { day: number; time: string };
          close: { day: number; time: string };
        }[]
      | null
  ) => boolean;
  toggleFavoriteClinic: (userId: string, clinicId: string, isCurrentlyFavorite: boolean) => Promise<void>
  fetchSavedClinics: (id: string) => Promise<void>;
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

  const fetchByWildSearch = async (city = "") => {
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



 const isClinicOpen = (
   openingHoursPeriods:
     | {
         open: { day: number; time: string };
         close: { day: number; time: string };
       }[]
     | null
 ): boolean => {
   if (!Array.isArray(openingHoursPeriods) || openingHoursPeriods.length === 0) {
     return false;
   }

   const currentDay = new Date().getDay();
   const currentTime = new Date();
  const currentTimeString = `${String(currentTime.getHours()).padStart(2, "0")}${String(currentTime.getMinutes()).padStart(2, "0")}`;

  //Extra koll för att behandla fler format av hur öppetider är sparat gällande öppet dygnet runt eller öppet till midnatt ex.
  for (let period of openingHoursPeriods) {
    if (period.open && period.open.time && period.close && period.close.time) {
      const closeTime =
        period.close.time === "0000" ? "2400" : period.close.time;

      if (period.open.day === currentDay) {
        if (
          currentTimeString >= period.open.time &&
          currentTimeString <= closeTime
        ) {
          return true; 
        }
      }
      if (period.close.day === currentDay) {
        if (
       currentTimeString >= period.open.time &&
       currentTimeString <= closeTime
     ) {
       return true;
       }
      }
     }
   }

   return false;
 };

 const fetchSavedClinics = useCallback(async (userId: string) => {
   try {
     setLoading(true);
     const response = await axios.get(`${API_URL}/saved-clinics/${userId}`);
     console.log("Response data:", response.data);

     const data = response.data;
     if (data.clinics) {
       setClinics(data.clinics);
     } else {
       console.error("No clinics found in response.");
       setClinics([]);
     }
   } catch (error) {
     console.error("Error fetching saved clinics:", error);
     setClinics([]);
   } finally {
     setLoading(false);
   }
 }, []);

 const toggleFavoriteClinic = async (
   userId: string,
   clinicId: string,
   isCurrentlyFavorite: boolean
 ) => {
   try {
     setLoading(true);

     if (isCurrentlyFavorite) {
       await axios.post(`${API_URL}/remove-saved-clinic`, {
         id: userId,
         clinicId,
       });
       console.log("Clinic removed successfully!");
     } else {
       await axios.post(`${API_URL}/save-clinic`, { id: userId, clinicId });
       console.log("Clinic saved successfully!");
     }
   } catch (error) {
     console.error(
       `Error ${isCurrentlyFavorite ? "removing" : "saving"} clinic:`,
       error
     );
     throw error;
   } finally {
     setLoading(false);
   }
 };


  return (
    <ClinicsContext.Provider
      value={{
        clinics,
        reviews,
        clinic,
        loading,
        fetchByWildSearch,
        fetchByLocation,
        fetchById,
        addReview,
        fetchReviews,
        isClinicOpen,
        fetchSavedClinics,
        toggleFavoriteClinic
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
