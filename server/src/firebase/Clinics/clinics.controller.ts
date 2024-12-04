
import { Request, Response } from "express";
import { db } from "../../firebase/firebase";

const getVetClinicsByCity = async (req: Request, res: Response) => {
  try {
    const city = req.query.city;

    const snapshot = await db
      .collection("vetClinics")
      .where("address.city", "==", city)
      .get();
    const clinics = snapshot.docs.map((doc: any) => ({
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

export { getVetClinicsByCity };

