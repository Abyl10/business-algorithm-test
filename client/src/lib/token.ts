import { ACCESS_TOKEN } from "../types/types";

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN) || "";
};

export const setToken = (token: string) => {
  token && localStorage.setItem(ACCESS_TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
