import { createClient } from "redis";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { logger } from "../utils/logger";

const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redisClient.connect().catch((err) => {
  logger.error("Failed to connect to Redis", err);
});

redisClient.on("error", (err) => {
  logger.error("Redis client error", err);
});

export const shortenLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "900000"),
  max: parseInt(process.env.RATE_LIMIT_MAX ?? "50"),
  message:
    process.env.RATE_LIMIT_MESSAGE ??
    "Too many URL shortening requests, please try again later",
  handler: (req, res, next, options) => {
    logger.warn("Rate limit exceeded", {
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
      statusCode: options.statusCode,
    });

    res.setHeader("Retry-After", Math.ceil(options.windowMs / 1000));
    res.status(options.statusCode).json({
      success: false,
      message: options.message,
    });
  },
});
