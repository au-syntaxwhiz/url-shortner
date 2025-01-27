import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/userModel";
import { logger } from "../utils/logger";

/**
 * Generate JWT
 * @param userId - ID of the user
 * @returns Signed JWT
 */
const generateToken = (userId: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Handle server error responses
 * @param res - Express response object
 * @param error - Error object
 * @param message - Optional custom message
 */
const handleError = (res: Response, error: Error, message = "Server error") => {
  logger.error(message, { error });
  res.status(500).json({ success: false, message });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("Registration failed - Email already in use", { email });
      res.status(400).json({ success: false, message: "Email already in use" });
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    // Generate a JWT for the new user
    const token = generateToken(newUser._id as string);

    logger.info("User registered successfully", { userId: newUser._id, email });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    handleError(res, error as Error, "Error retrieving user data");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login failed - User not found", { email });
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      logger.warn("Login failed - Invalid credentials", { email });
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate a JWT
    const token = generateToken(user._id as string);

    logger.info("User logged in successfully", { userId: user._id, email });

    res.json({
      success: true,
      token,
      userId: user?._id,
    });
  } catch (error) {
    handleError(res, error as Error, "Error retrieving user data");
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
    if (!token) {
      logger.warn("Get user failed - Token missing");
      res.status(401).json({ success: false, message: "Token is missing" });
      return;
    }

    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Fetch the user by ID
    const user = await User.findById(decoded.userId).select(
      "-passwordHash -_id"
    );
    if (!user) {
      logger.warn("Get user failed - User not found", {
        userId: decoded.userId,
      });
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    logger.info("User data retrieved successfully", { userId: decoded.userId });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    handleError(res, error as Error, "Error retrieving user data");
  }
};
