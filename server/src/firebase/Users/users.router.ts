
const express = require("express");
import { verifySessionCookie } from "../../middleware/verifySessionCookie";
import { createSessionCookie, getUserData, registerUser, sessionLogout } from "./users.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/session-login", createSessionCookie);
router.post("/session-logout", sessionLogout);
router.get("/user-data", verifySessionCookie, getUserData);

export default router;
