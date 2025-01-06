import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user-model.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ["HS256"],
});

export const hasPermission = (permission) => async (req, res, next) => {
  try {
    // Find user from database
    const user = await UserModel.findById(req.auth.id);
    // Use the user role to find their permission
    const permission = permissions.find(value => value.role === user.role);
    if (!permission) {
      return res.status(403).json("No permission found!");
    }
    // Check if permission actions include action
    if (permission.actions.includes(action)) {
      next();
    } else {
      res.status(403).json("Action not allowed!");
    }
// Return a response
  } catch (error) {
    next(error);
  }
}