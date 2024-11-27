const express = require("express");
import { getPlaces } from "./google.controller";

const router = express.Router();

router.get("/places", getPlaces);

export default router;
