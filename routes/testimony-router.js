import { Router } from "express";
import { approveTestimony, deleteTestimony, getAllTestimonies, postTestimony } from "../controllers/testimony-controller.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

// Create a router  
const testimonyRouter = Router();

// Define routes
testimonyRouter.patch("/testimonies/:id", isAuthenticated, hasPermission("approve_testimony"), approveTestimony);

testimonyRouter.post("/testimonies", isAuthenticated, postTestimony);

testimonyRouter.get("/testimonies", isAuthenticated, getAllTestimonies);



testimonyRouter.delete("/testimonies/:id", isAuthenticated, hasPermission("delete_testimony"), deleteTestimony);

// Export the router
export default testimonyRouter; 