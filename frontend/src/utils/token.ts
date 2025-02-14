export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const setUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};
