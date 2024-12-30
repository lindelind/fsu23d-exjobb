require("dotenv").config();
import axios from "axios";
const fs = require("fs");
import { Clinic, Coordinates, FormattedAddress, PlaceDetails } from "../types/types";
import { locations } from "./locations";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);


const fetchVeterinaryClinicsByCity = async (
  location: Coordinates,
  cityName: string
): Promise<Clinic[]> => {
  try {
    console.log(`Hämtar kliniker för: ${cityName}`);
    const allClinics = new Map();

    let nextPageToken = null;

    do {
      const nearbySearchUrl: any = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=20000&type=veterinary_care&key=${GOOGLE_API_KEY}${
        nextPageToken ? `&pagetoken=${nextPageToken}` : ""
      }`;

      const nearbyResponse = await axios.get(nearbySearchUrl);

      if (
        nearbyResponse.data.status !== "OK" &&
        nearbyResponse.data.status !== "ZERO_RESULTS"
      ) {
        console.error(
          `Fel vid hämtning för ${cityName}:`,
          nearbyResponse.data.status
        );
        break;
      }

      const places = nearbyResponse.data.results;
      console.log(`Hämtade ${places.length} kliniker på denna sida.`);

      for (const place of places) {
        if (!allClinics.has(place.place_id)) {
          const detailsSvUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,geometry,international_phone_number,website,opening_hours,address_component,place_id,rating,user_ratings_total&key=${GOOGLE_API_KEY}&language=sv`;
          const detailsEnUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,geometry,international_phone_number,website,opening_hours,address_component,place_id,rating,user_ratings_total&key=${GOOGLE_API_KEY}&language=en`;


          const [detailsSvResponse, detailsEnResponse] = await Promise.all([
            axios.get(detailsSvUrl),
            axios.get(detailsEnUrl),
          ]);

          if (
            detailsSvResponse.data.status !== "OK" ||
            detailsEnResponse.data.status !== "OK"
          ) {
            console.warn(
              `Fel vid hämtning av detaljer för ${place.place_id}:`,
              detailsSvResponse.data.status,
              detailsEnResponse.data.status
            );
            continue;
          }

          const detailsSv: PlaceDetails = detailsSvResponse.data.result;
          const detailsEn: PlaceDetails = detailsEnResponse.data.result;

          if (!detailsSv || !detailsEn) continue;

          const formattedOpeningHoursSv =
            detailsSv.opening_hours?.weekday_text.map((entry) =>
              capitalizeFirstLetter(entry)
            ) || null;

            const openingHoursPeriodsSv =
              detailsSv.opening_hours?.periods || null;

          const addressComponents = detailsSv.address_components || [];
          const formattedAddress: FormattedAddress = {
            streetAddress: (() => {
              const route =
                addressComponents.find((component) =>
                  component.types.includes("route")
                )?.long_name || null;
              const streetNumber =
                addressComponents.find((component) =>
                  component.types.includes("street_number")
                )?.long_name || null;
              return route && streetNumber
                ? `${route} ${streetNumber}`
                : route || null;
            })(),
            zip:
              addressComponents.find((component) =>
                component.types.includes("postal_code")
              )?.long_name || null,
            city:
              addressComponents.find((component) =>
                component.types.includes("postal_town")
              )?.long_name || "",
            län:
              addressComponents.find((component) =>
                component.types.includes("administrative_area_level_1")
              )?.long_name || "",
            country:
              addressComponents.find((component) =>
                component.types.includes("country")
              )?.long_name || "",
          };

          allClinics.set(place.place_id, {
            id: detailsSv.place_id,
            name: detailsSv.name,
            address: formattedAddress,
            coordinates: detailsSv.geometry?.location
              ? {
                  lat: detailsSv.geometry.location.lat,
                  long: detailsSv.geometry.location.lng,
                }
              : { lat: null, long: null },
            formatted_address: detailsSv.formatted_address,
            phone_number: detailsSv.international_phone_number || "",
            website: detailsSv.website || "",
            openinghours: {
              sv: {
                weekday_text: formattedOpeningHoursSv,
                periods: openingHoursPeriodsSv,
              },
              en: {
                weekday_text: detailsEn.opening_hours?.weekday_text || null,
                
              },
            },
            rating: detailsSv.rating || null,
            user_ratings_total: detailsSv.user_ratings_total || 0,
          });
        }
      }

      nextPageToken = nearbyResponse.data.next_page_token || null;

      if (nextPageToken) {
        console.log(`next_page_token finns: ${nextPageToken}`);
        await new Promise((r) => setTimeout(r, 2000));
      } else {
        console.log("Ingen nästa sida.");
      }
    } while (nextPageToken);

    return Array.from(allClinics.values());
  } catch (error: any) {
    console.error(`Fel vid hämtning för ${cityName}:`, error.message);
    return [];
  }
};


// //Ny hämtning av alla kliniker till en ny json-fil med datum

const generateNewClinicsFile = async (locations:any) => {
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const fileName = `clinics_${timestamp}.json`;

  const allClinics = new Map();

  for (const location of locations) {
    console.log(`Hämtar för plats: ${location.city}`);
    const newClinics = await fetchVeterinaryClinicsByCity(
      { lat: location.lat, lng: location.lng },
      location.city
    );

    newClinics.forEach((clinic) => {
      if (!allClinics.has(clinic.id)) {
        allClinics.set(clinic.id, clinic);
      }
    });
  }

  const clinicArray = Array.from(allClinics.values());
  fs.writeFileSync(fileName, JSON.stringify(clinicArray, null, 2));
  console.log(
    `Hämtningen är klar. Totalt antal kliniker: ${clinicArray.length}. Fil sparad som ${fileName}`
  );

  return fileName;
};


(async () => {
  await generateNewClinicsFile(locations);
})();


