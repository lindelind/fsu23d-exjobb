
const express = require("express");
import { verifyToken } from "../../middleware/verifyToken";
import { getUserData, registerUser } from "./users.controller";

const router = express.Router();

router.post("/register", registerUser);
router.get("/user-data", verifyToken, getUserData);

export default router;
