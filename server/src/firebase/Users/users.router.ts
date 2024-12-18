
const express = require("express");
import { verifySessionCookie } from "../../middleware/verifySessionCookie";
import { createSessionCookie, fetchSavedClinics, getUserData, registerUser, saveClinicToUser, sessionLogout } from "./users.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/session-login", createSessionCookie);
router.post("/session-logout", sessionLogout);
router.get("/user-data", verifySessionCookie, getUserData);
router.post("/save-clinic", saveClinicToUser)
router.get("/saved-clinics/:id", fetchSavedClinics);

export default router;
