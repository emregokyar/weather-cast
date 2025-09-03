import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRoute from "./src/routes/home.js";

// Setting up __dirname variable 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Views setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", homeRoute);

// Running App
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});