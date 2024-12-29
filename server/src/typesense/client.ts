const Typesense = require("typesense");
require("dotenv").config();

export const client = new Typesense.Client({
  nodes: [
    {
      host: "lscxdvaqo08kbmyrp-1.a1.typesense.net", 
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

//skapa schema i typesense
// const schema = {
//   name: "clinics",
//   fields: [
//     { name: "id", type: "string" },
//     { name: "name", type: "string" },
//     { name: "formatted_address", type: "string" },
//     { name: "address.streetAddress", type: "string" },
//     { name: "address.zip", type: "string" },
//     {name: "address.city", type: "string"},
//     { name: "coordinates.lat", type: "float" },
//     { name: "coordinates.long", type: "float" },
//     { name: "phone_number", type: "string" },
//     { name: "website", type: "string" },
//     { name: "openinghours", type: "object" },
//     { name: "rating", type: "float" },
//   ],
//   default_sorting_field: "rating",
//   enable_nested_fields: true,
// };


// client
//   .collections()
//   .create(schema)
//   .then(function (collection: any) {
//     console.log("Collection created:", collection);
//   })
//   .catch(function (error: any) {
//     console.error("Error creating collection:", error);
//   });

const clinicDocument = {
  id: "ChIJrbuW1X61YEYRmvipCTVj64Q",
  name: "Evidensia Djurkliniken Sandviken",
  rating: 4.3,
  address: {
    streetAddress: "Länsmansvägen 5",
    zip: "811 35",
    city: "Sandviken",
    län: "Gävleborgs län",
    country: "Sverige",
  },
  coordinates: {
    lat: 60.6401863,
    long: 16.7928408,
  },
  formatted_address: "Länsmansvägen 5, 811 35 Sandviken, Sverige",
  phone_number: "",
  website:
    "http://evidensia.se/klinik/evidensia-djurkliniken-sandviken/?utm_source=places&utm_medium=organic&utm_campaign=gmb",
  openinghours: {
    sv: [
      "måndag: 08:00–17:00",
      "tisdag: 08:00–17:00",
      "onsdag: 08:00–17:00",
      "torsdag: 08:00–17:00",
      "fredag: 08:00–17:00",
      "lördag: Stängt",
      "söndag: Stängt",
    ],
    en: [
      "Monday: 8:00 AM – 5:00 PM",
      "Tuesday: 8:00 AM – 5:00 PM",
      "Wednesday: 8:00 AM – 5:00 PM",
      "Thursday: 8:00 AM – 5:00 PM",
      "Friday: 8:00 AM – 5:00 PM",
      "Saturday: Closed",
      "Sunday: Closed",
    ],
  },
}
  // Lägg till dokument i clinics
  client
    .collections("clinics")
    .documents()
    .import(JSON.stringify(clinicDocument))
    .then(function (result: any) {
      console.log("Documents imported:", result);
    })
    .catch(function (error: any) {
      console.error("Error importing documents:", error);
    });


