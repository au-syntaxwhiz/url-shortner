import api from "../utils/api";
import { getUserId } from "../utils/token";

interface ShortenURLRequest {
  originalUrl: string;
  slug?: string;
  userId?: string;
}

export const shortenURL = async (originalUrl: string, slug?: string) => {
  const userId = getUserId();
  const requestBody: ShortenURLRequest = { originalUrl, slug };

  if (userId) {
    requestBody.userId = userId;
  }

  const response = await api.post("/urls/shorten", requestBody);
  return response.data;
};

export const fetchUserURLs = async () => {
  const response = await api.get("/urls");
  return response.data;
};
