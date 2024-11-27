import { Request, Response } from "express";
import {db} from "../firebase";

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
