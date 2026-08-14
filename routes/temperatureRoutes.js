// import { Router } from "express";
// import { addTemperature } from "../controllers/pomiarControllers.js";

// const router = Router();
// router.post("/dodaj", validateTemperature,addTemperature);

// export default router;

// import express from "express";
import { Router } from "express";
import { addTemperature } from "../controllers/temperatureController.js";
import validateTemperature from "../middleware/validateTemperature.js";

const router = Router();

router.post("/dodaj", validateTemperature, addTemperature);

export default router;
