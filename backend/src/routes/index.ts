import { Router } from "express";
import urlRoutes from "./urlRoutes";
import userRoutes from "./userRoutes";
import { redirectToUrl } from "../controllers/urlController";

const router = Router();

router.use("/urls", urlRoutes);
router.use("/auth", userRoutes);
router.get("/:slug", redirectToUrl);

export default router;
