import validator from "validator";
import { nanoid } from "nanoid";

/**
 * Generates a unique 6-character slug using nanoid.
 */
export const generateSlug = (): string => {
  return nanoid(6); // Generates a random 6-character string
};

/**
 * Validates if the given string is a valid URL.
 *
 * @param url - The URL string to validate.
 * @returns boolean - Returns true if the URL is valid, false otherwise.
 */
export const isValidUrl = (url: string): boolean => {
  return validator.isURL(url); // Uses validator.js to check if the string is a valid URL.
};
