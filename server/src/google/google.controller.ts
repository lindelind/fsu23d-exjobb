import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const getPlaces = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const query = req.query.query; 
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query as string
    )}&key=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

export { getPlaces };
