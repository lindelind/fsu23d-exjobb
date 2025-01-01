const admin = require("firebase-admin");
const fs = require("fs");
import { db } from "../firebase/firebase";
import { Clinic } from "../types/types";
import { client } from "../typesense/client";
const path = require("path");

const getCurrentDateFileName = (): string => {
  const today = new Date().toISOString().split("T")[0];
  return `clinics_${today}.json`;
};

const readJSONFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    console.error("JSON-fil hittades inte:", filePath);
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const fetchExistingClinics = async (collectionName: string) => {
  const snapshot = await db.collection(collectionName).get();
  const clinics: Record<string, any> = {};
  snapshot.forEach((doc: any) => {
    clinics[doc.id] = doc.data();
  });
  return clinics;
};


const uploadToTypesense = async (clinics: Clinic[]) => {
  try {
    await client
      .collections("vetClinics")
      .documents()
      .delete({ filter_by: "" });
    console.log("Deleted all existing documents in Typesense collection");

    await client
      .collections("vetClinics")
      .documents()
      .import(
        clinics.map((clinic: any) => ({
          id: clinic.id,
          name: clinic.name,
          website: clinic.website,
          phone_number: clinic.phone_number,
          formatted_address: clinic.formatted_address,
          "address.city": clinic.address.city,
          "address.län": clinic.address.län || "",
          "address.country": clinic.address.country || "",
          openinghours: {
            sv: {
          periods: clinic.openinghours?.sv?.periods ?? [],
      },
    },
          rating: clinic.rating || 0,
        })),
        { action: "upsert" }
      );
    console.log("Uploaded clinics to Typesense successfully.");
  } catch (error) {
    console.error("Error uploading to Typesense:", error);
  }
};


const compareAndUpdateClinics = async (
  jsonFilePath: string,
  collectionName: string
) => {
  const newClinics = readJSONFile(jsonFilePath);

  if (!newClinics || newClinics.length === 0) {
    console.error(
      "Ingen data hittades eller filen existerar inte. Avbryter uppdateringen."
    );
    return; 
  }

  const existingClinics = await fetchExistingClinics(collectionName);

  const newClinicIds = new Set(newClinics.map((clinic: Clinic) => clinic.id));
  const batch = db.batch();

  let updatedCount = 0;
  let addedCount = 0;
  let deletedCount = 0;

  for (const clinic of newClinics) {
    const existingClinic = existingClinics[clinic.id];

    if (existingClinic) {
      const isUpdated =
        JSON.stringify(existingClinic) !== JSON.stringify(clinic);
      if (isUpdated) {
        const docRef = db.collection(collectionName).doc(clinic.id);
        batch.set(docRef, clinic);
        updatedCount++;
      }
    } else {
      const docRef = db.collection(collectionName).doc(clinic.id);
      batch.set(docRef, clinic);
      addedCount++;
    }
  }

  for (const existingClinicId of Object.keys(existingClinics)) {
    if (!newClinicIds.has(existingClinicId)) {
      const docRef = db.collection(collectionName).doc(existingClinicId);
      batch.delete(docRef);
      deletedCount++;
    }
  }

  await batch.commit();
  console.log(
    `Uppdatering slutförd. ${updatedCount} kliniker uppdaterade, ${addedCount} nya kliniker tillagda, ${deletedCount} kliniker borttagna.`
  );
  return newClinics;
};


const jsonFilePath = path.resolve(__dirname, getCurrentDateFileName()); 
const collectionName = "testClinics"; 
(async () => {
  const newClinics = await compareAndUpdateClinics(
    jsonFilePath,
    collectionName
  );
  if (newClinics.length > 0) {
    await uploadToTypesense(newClinics);
  } else {
    console.log("Inga kliniker att ladda upp till Typesense.");
  }
})();
