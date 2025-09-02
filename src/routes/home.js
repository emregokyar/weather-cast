import express from "express";
import { homePage } from "../controllers/homeController.js";  //Importing Controller

const router= express.Router();
router.get("/", homePage);

export default router;