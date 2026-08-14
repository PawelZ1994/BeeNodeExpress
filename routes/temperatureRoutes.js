import { Router } from "express";
import {
  addTemperature,
  getDevices,
} from "../controllers/temperatureController.js";
import validateTemperature from "../middleware/validateTemperature.js";
import authMiddleware from "../middleware/authMiddleware.js"; //ta linia dodaje ten JWT token

const router = Router();

router.post("/dodaj", validateTemperature, addTemperature);
router.get("/devices", authMiddleware, getDevices);

export default router;

// import { Router } from "express";
// import { addTemperature } from "../controllers/pomiarControllers.js";

// const router = Router();
// router.post("/dodaj", validateTemperature,addTemperature);

// export default router;

// import express from "express";
