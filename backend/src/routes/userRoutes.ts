import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";

export const userRoutes = Router();

// Route to register a user
userRoutes.post("/register", registerUser);

// Route to log in a user
userRoutes.post("/login", loginUser);

userRoutes.get("/user", authenticateUser, getUser);

export default userRoutes;
