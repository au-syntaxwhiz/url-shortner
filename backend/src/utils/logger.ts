import winston from "winston";

// Create a Winston logger with multiple transports (console and file logging)
export const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

/**
 * Logs an error message with a specific log level.
 * @param message - The message to log.
 */
export const logError = (message: string): void => {
  logger.error(message);
};

/**
 * Logs an info message with a specific log level.
 * @param message - The message to log.
 */
export const logInfo = (message: string): void => {
  logger.info(message);
};

/**
 * Logs a warning message with a specific log level.
 * @param message - The message to log.
 */
export const logWarn = (message: string): void => {
  logger.warn(message);
};
