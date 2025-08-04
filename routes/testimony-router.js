import { Router } from "express";
import { deleteTestimony, getAllTestimonies, getTestimonyById, postTestimony, approveTestimony } from "../controllers/testimony-controller.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router  
const testimonyRouter = Router();

// Define routes
testimonyRouter.post("/testimony", isAuthenticated, postTestimony);

testimonyRouter.get("/testimony", isAuthenticated, getAllTestimonies);

testimonyRouter.get("/testimony/:id", isAuthenticated, getTestimonyById);

testimonyRouter.patch("/testimony/:id/approve", isAuthenticated, hasPermission("approve_testimony"), approveTestimony);

testimonyRouter.delete("/testimonies/:id", isAuthenticated, hasPermission("delete_testimony"), deleteTestimony);

// Export the router
export default testimonyRouter; 