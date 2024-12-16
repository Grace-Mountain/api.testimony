import { Router } from "express";
import { deleteTestimony, getAllTestimonies, postTestimony } from "../controllers/testimony-controller.js";

// Create a router  
const testimonyRouter = Router();

// Define routes
testimonyRouter.post("/testimony", postTestimony);

testimonyRouter.get("/testimony", getAllTestimonies);

testimonyRouter.delete("/testimony/:id", deleteTestimony);

// Export the router
export default testimonyRouter; 