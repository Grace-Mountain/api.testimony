import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user-controller.js";
import { userAvatarUpload } from "../middlewares/upload.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", userAvatarUpload.single('avatar'), registerUser);

userRouter.post("/users/login", loginUser);

userRouter.post("/users/logout", logoutUser);

// Export the router
export default userRouter;  