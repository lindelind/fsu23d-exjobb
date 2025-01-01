
import express from "express";

import { getVetClinicsById, getVetClinicsByLocation, getVetClinicsByWildSearch } from "../Clinics/clinics.controller";

const router = express.Router();
// router.get("/vet-clinics", getVetClinicsByCity);
router.get("/vet-clinics", getVetClinicsByWildSearch);
router.get("/vet-clinics/:id", getVetClinicsById);
router.get("/vet-clinics-location", getVetClinicsByLocation);

export default router;
