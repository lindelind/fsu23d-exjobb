import express from "express";
import { getVetClinicsByCity, getVetClinicsById } from "../Clinics/clinics.controller";

const router = express.Router();
router.get("/vet-clinics", getVetClinicsByCity);
router.get("/vet-clinics/:id", getVetClinicsById);

export default router;
