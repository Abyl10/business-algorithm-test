import api from "./api";

export const login = async (
  username: string,
  password: string
): Promise<{ accessToken: string; message: string }> => {
  return await api
    .post("/auth/login", { username, password })
    .then((res) => res.data);
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await api
    .post("/auth/register", { username, email, password })
    .then((res) => res.data);
};
