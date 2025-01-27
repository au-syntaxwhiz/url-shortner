import rateLimit from "express-rate-limit";

export const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many URL shortening requests, please try again later",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
});
