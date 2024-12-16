import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user-controller.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("users/login", loginUser);

// Export the router
export default userRouter;
