
import express from "express";
import { addReview, fetchReviews } from "../Reviews/reviews.controller";

const router = express.Router();

router.post("/vet-clinics/:clinicId/reviews", addReview);
router.get("/vet-clinics/:clinicId/reviews", fetchReviews);

export default router;