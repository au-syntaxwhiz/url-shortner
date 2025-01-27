import { Router } from "express";
import { createShortUrl, getUserUrls } from "../controllers/urlController";
import { shortenLimiter } from "../config/rateLimiter";
import { authenticateUser } from "../middleware/authMiddleware";

export const urlRoutes = Router();

urlRoutes.post("/shorten", shortenLimiter, createShortUrl);

urlRoutes.get("/", authenticateUser, getUserUrls);

export default urlRoutes;
