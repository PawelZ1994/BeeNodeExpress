import { Router } from "express";
import { addTemperature } from "../controllers/pomiarControllers.js";

const router = Router();
router.post("/dodaj", addTemperature);

export default router;
