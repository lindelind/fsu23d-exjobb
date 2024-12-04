import express from "express";
import { getVetClinicsByCity } from "../Clinics/clinics.controller";

const router = express.Router();
router.get("/vet-clinics", getVetClinicsByCity);

export default router;
