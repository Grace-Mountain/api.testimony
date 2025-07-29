import { Router } from "express";
import { deleteTestimony, getAllTestimonies, getTestimonyById, postTestimony } from "../controllers/testimony-controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a router  
const testimonyRouter = Router();

// Define routes
testimonyRouter.post("/testimony", isAuthenticated, postTestimony);

testimonyRouter.get("/testimony", isAuthenticated, getAllTestimonies);

testimonyRouter.get("/testimony/:id", isAuthenticated, getTestimonyById);

testimonyRouter.delete("/testimony/:id", isAuthenticated, deleteTestimony);

// Export the router
export default testimonyRouter; 