import { Request, Response } from "express";
import Url from "../models/urlModel";
import { generateSlug } from "../utils/validationUtils";
import { logger } from "../utils/logger";

const BASE_URL = process.env.BASE_URL;

/**
 * Creates a new shortened URL.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>} - No explicit return value (void)
 */
export const createShortUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { originalUrl, slug: customSlug } = req.body;
  const userId = (req as Request & { userId: string | undefined }).userId;

  try {
    const slug = customSlug || generateSlug();

    const existingUrl = await Url.findOne({ shortSlug: slug });
    if (existingUrl) {
      logger.warn("Slug already in use", { slug });
      res.status(400).json({ success: false, message: "Slug already in use" });

      return;
    }

    // Create and save the new URL document
    const newUrl = new Url({
      originalUrl,
      shortSlug: slug,
      user: userId,
    });

    await newUrl.save();

    logger.info("Shortened URL created successfully", {
      userId,
      originalUrl,
      shortUrl: `${BASE_URL}/${slug}`,
    });

    res.status(201).json({
      success: true,
      shortUrl: `${BASE_URL}/${slug}`,
    });
  } catch (error) {
    logger.error("Error creating shortened URL", { error });
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Redirects to the original URL based on the slug.
 */
export const redirectToUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const url = await Url.findOne({ shortSlug: slug });

    if (!url) {
      logger.warn("Slug not found during redirection", { slug });
      res.status(404).json({ success: false, message: "URL not found" });
      return;
    }

    url.visits += 1;
    await url.save();

    logger.info("Redirect successful", {
      slug,
      originalUrl: url.originalUrl,
      visits: url.visits,
    });

    res.redirect(url.originalUrl);
  } catch (error) {
    logger.error("Error redirecting to URL", { error });
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Retrieves all URLs created by the authenticated user.
 */
export const getUserUrls = async (req: Request, res: Response) => {
  const userId = (req as Request & { userId: string | undefined }).userId;

  try {
    const urls = await Url.find({ user: userId });

    // Log successful retrieval
    logger.info("User URLs retrieved successfully", {
      userId,
      urlCount: urls.length,
    });

    res.json({ success: true, urls });
  } catch (error) {
    logger.error("Error fetching user URLs", { error });
    res.status(500).json({ success: false, message: "Server error" });
  }
};
