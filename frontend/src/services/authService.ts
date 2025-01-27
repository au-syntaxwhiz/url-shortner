import api from "../utils/api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/auth/user");
  return response.data;
};
