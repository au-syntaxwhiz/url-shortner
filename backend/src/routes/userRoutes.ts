import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";

export const userRoutes = Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/user", authenticateUser, getUser);

export default userRoutes;
