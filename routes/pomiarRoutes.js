import { Router } from "express";
import { addTemperature } from "../controllers/pomiarControllers.js";
import validateTemperature from "../middleware/validateTemperature.js"

const router = Router();
router.post("/dodaj", validateTemperature,addTemperature);

export default router;
