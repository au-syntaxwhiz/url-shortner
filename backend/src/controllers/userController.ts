import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/userModel";
import { logger } from "../utils/logger";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already in use" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    // Generate a JWT for the new user
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token, // Return the token
    });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate a JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "Token is missing" });
      return;
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: string;
    };

    // Fetch the user by ID
    const user = await User.findById(decoded.userId).select(
      "-passwordHash -_id"
    );
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Return the user data excluding password and ID
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error((error as Error).message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
