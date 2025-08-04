import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user-controller.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.post("/users/logout", logoutUser);

// Export the router
export default userRouter;  