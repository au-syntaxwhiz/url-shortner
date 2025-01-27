import api from "../utils/api";

export const shortenURL = async (originalUrl: string, slug?: string) => {
  const response = await api.post("/urls/shorten", { originalUrl, slug });
  return response.data;
};

export const fetchUserURLs = async () => {
  const response = await api.get("/urls");
  return response.data;
};
