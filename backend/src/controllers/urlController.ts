import { Request, Response } from "express";
import Url from "../models/urlModel";
import { generateSlug } from "../utils/validationUtils";
import { logger } from "../utils/logger";

export const createShortUrl = async (req: Request, res: Response) => {
  const { originalUrl, slug: customSlug } = req.body;
  const userId = (req as Request & { userId: string | undefined }).userId;

  try {
    const slug = customSlug || generateSlug();

    const newUrl = new Url({
      originalUrl,
      shortSlug: slug,
      user: userId,
    });

    await newUrl.save();

    res.status(201).json({
      success: true,
      shortUrl: `http://localhost:8000/${slug}`,
    });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const redirectToUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const url = await Url.findOne({ shortSlug: slug });

    if (!url) {
      res.status(404).json({ success: false, message: "URL not found" });
      return;
    }

    url.visits += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserUrls = async (req: Request, res: Response) => {
  const userId = (req as Request & { userId: string | undefined }).userId;

  const urls = await Url.find({ user: userId });

  res.json({ success: true, urls });
};

export const updateSlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug, newSlug } = req.body;
  const userId = (req as Request & { userId: string | undefined }).userId;

  const url = await Url.findOne({ shortSlug: slug, user: userId });

  if (!url) {
    res
      .status(404)
      .json({ success: false, message: "URL not found or not authorized" });
    return;
  }

  url.shortSlug = newSlug;
  await url.save();

  res.json({ success: true, message: "Slug updated successfully" });
};
