import { Request, Response } from "express"; // Se till att dessa är installerade
import db from "../firebase"; // Importera Firestore

const getPetFirstAid = async (req: Request, res: Response) => {
  try {
    // test av en första hämtning
    const snapshot = await db.collection("PetFirstAid").get();
    const data = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    res.json(data);
    console.log(data)
  } catch (error) {
    res.status(500).json({ error: "Could not fetch data" });
  }
};


export { getPetFirstAid };
