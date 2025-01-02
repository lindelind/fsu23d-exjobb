
import { Request, Response } from "express";
import { db } from "../../firebase/firebase";
 import haversine from "haversine-distance";
import { Clinic } from "../../types/types";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { client } from "../../typesense/client";

const getVetClinicsByCity = async (req: Request, res: Response) => {
  try {
    const city = req.query.city;

    const snapshot = await db
      .collection("testClinics")
      .where("address.city", "==", city)
      .get();
    const clinics = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: clinics,
      total: clinics.length,
    });
  } catch (error: any) {
    console.error("Error fetching vet clinics:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vet clinics",
    });
  }
};

const getVetClinicsById = async (req:Request, res: Response) => {
    try{
        const id = req.params.id;
        const snapshot = await db
        .collection("testClinics")
        .where("id", "==", id)
        .get();
        const clinic = snapshot.docs.map((doc: QueryDocumentSnapshot ) => ({
        id: doc.id,
        ...doc.data(),
        }));

        res.status(200).json({
        success: true,
        data: clinic,
        });
    } catch (error: any) {
    console.error("Error fetching vet clinics:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vet clinics",
    });
    }
  };


 const getVetClinicsByLocation = async (req: Request, res: Response) => {
   try {
     const { lat, long, radius } = req.query;

     const userLat = parseFloat(lat as string);
     const userLong = parseFloat(long as string);
     const radiusInKm = parseFloat(radius as string);

     console.log({
       lat: userLat,
       long: userLong,
       radius: radiusInKm,
     });


    const radiusInDegreesLat = radiusInKm / 111.32;
    const radiusInDegreesLon =
      radiusInKm / (111.32 * Math.cos(userLat * (Math.PI / 180))); 

   
    const minLatitude = userLat - radiusInDegreesLat; 
    const maxLatitude = userLat + radiusInDegreesLat;
    const minLongitude = userLong - radiusInDegreesLon;
    const maxLongitude = userLong + radiusInDegreesLon;

    console.log("Bounding box:", {
      minLatitude,
      maxLatitude,
      minLongitude,
      maxLongitude,
    });


     const clinics = db.collection("testClinics");
     const query = clinics
       .where("coordinates.lat", ">=", minLatitude)
       .where("coordinates.lat", "<=", maxLatitude)
       .where("coordinates.long", ">=", minLongitude)
       .where("coordinates.long", "<=", maxLatitude);

     const snapshot = await query.get();

     if (snapshot.empty) {
       res.status(404).json({success: false, message: "No vet clinics found within radius.",});
       return;
     }

     const results = snapshot.docs
       .map((doc: QueryDocumentSnapshot) => {
         const clinic = doc.data();
         const distance =
           (haversine(
             { lat: userLat, lon: userLong },
             { lat: clinic.coordinates.lat, lon: clinic.coordinates.long }
           ) / 1000).toFixed(1); 
         return { id: doc.id, ...clinic, distance };
       })
       .filter((clinic: Clinic) => clinic?.distance <= radiusInKm)
       .sort((a: Clinic, b: Clinic) => a.distance - b.distance)
      //  .slice(0, 5);

     res.status(200).json({ success: true, data: results });
   } catch (error: any) {
     console.error("Error fetching vet clinics by location:", error.message);
     res
       .status(500)
       .json({ error: "Internal server error", details: error.message });
   }
 };

const getVetClinicsByWildSearch = async (req: Request, res: Response) => {
  try {
    const query = req.query.city as string;
    const page = parseInt(req.query.page as string) || 1; 
    const perPage = parseInt(req.query.perPage as string) || 30
    console.log("Received query:", query);

    console.log("Connecting to Typesense...");
    const typesenseResult = await client
      .collections("vetClinics")
      .documents()
      .search({
        q: query,
        query_by: "address.city, name",
        page,
        per_page: perPage,
      });

    console.log("Typesense result:", typesenseResult);

    if (typesenseResult.hits.length > 0) {
      const clinics = typesenseResult.hits.map((hit: any) => hit.document);

      res.status(200).json({
        success: true,
        data: clinics,
        total: clinics.length,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No clinics found matching your query",
      });
    }
  } catch (error: any) {
    console.error("Error fetching vet clinics:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vet clinics",
      details: error.message,
    });
  }
};


export { getVetClinicsByCity, getVetClinicsById , getVetClinicsByLocation, getVetClinicsByWildSearch};

