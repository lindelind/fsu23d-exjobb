
const express = require("express");
import { registerUser } from "./users.controller";

const router = express.Router();

router.post("/register", registerUser);

export default router;
