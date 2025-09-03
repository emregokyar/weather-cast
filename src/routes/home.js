import express from "express";
import { homePage } from "../controllers/homeController.js";  //Importing Controller
import { currentWeather } from "../controllers/homeController.js";
import { searchWeather } from "../controllers/homeController.js";

const router= express.Router();
router.get("/", homePage);
router.post("/search", searchWeather);
router.get("/current", currentWeather);

export default router;