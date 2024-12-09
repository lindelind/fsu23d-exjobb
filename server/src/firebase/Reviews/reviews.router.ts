
import express from "express";
import { addReview } from "../Reviews/reviews.controller";

const router = express.Router();

router.post("/vet-clinics/:clinicId/reviews", addReview);

export default router;