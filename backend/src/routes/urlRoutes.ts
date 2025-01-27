import { Router } from "express";
import {
  createShortUrl,
  redirectToUrl,
  getUserUrls,
  updateSlug,
} from "../controllers/urlController";
import { shortenLimiter } from "../config/rateLimiter";
import { authenticateUser } from "../middleware/authMiddleware";

export const urlRoutes = Router();

// Route to create a short URL (protected, with rate-limiting)
urlRoutes.post("/shorten", shortenLimiter, createShortUrl);

// Route to fetch all URLs created by the logged-in user (protected)
urlRoutes.get("/", authenticateUser, getUserUrls);

// Route to update a slug for a user's URL (protected)
urlRoutes.put("/update-slug", authenticateUser, updateSlug);

export default urlRoutes;
