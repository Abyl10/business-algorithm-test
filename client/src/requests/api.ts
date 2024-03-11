import axios from "axios";
import { getAccessToken, removeToken } from "../lib/token";

const baseURL = "http://localhost:8000/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401, 403].includes(error.response.status)) {
      console.log("Unauthorized");
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
