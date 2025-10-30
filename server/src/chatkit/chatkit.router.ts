import express from "express";
import { createSession } from "./chatkit.controller";

const router = express.Router();

router.post("/chatkit/session", createSession);

export default router;
