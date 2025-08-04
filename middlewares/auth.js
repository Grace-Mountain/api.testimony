import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user-model.js";
import { permissions } from "../utils/rbac.js";

// Middleware to check if user is authenticated
export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ["HS256"],
});

// Middleware to check if user has permission
export const hasPermission = (requiredPermission) => async (req, res, next) => {
  try {
    // Find user from database
    const user = await UserModel.findById(req.auth.id);
    // Use the user role to find their permission
    const userPermission = permissions.find(value => value.role === user.role);
    if (!userPermission) {
      return res.status(403).json("No permission found!");
    }
    // Check if permission actions include the required permission
    if (userPermission.actions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).json("Action not allowed!");
    }
  } catch (error) {
    next(error);
  }
}