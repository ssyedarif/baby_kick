import express from "express";
import { protect } from "../middleware/keyMiddleware.js";

import {
  createLog,
  getTodaySummary,
  getSummary,
} from "../controllers/logController.js";

const router = express.Router();

router.get("/createLog", protect, createLog);
router.get("/getTodaySummary", protect, getTodaySummary);
router.get("/getSummary", protect, getSummary);

export default router;
