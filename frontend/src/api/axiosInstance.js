import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "../utils/token";

const BASEURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASEURL,
});

const refreshToken = async (refresh) => {
  const res = await axios.post(`${BASEURL}/accounts/token/refresh/`, {
    refresh,
  });
  return res.data;
};

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR (AUTO REFRESH)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        const res = await refreshToken(refresh);

        setTokens(res);

        originalRequest.headers.Authorization = `Bearer ${res.access}`;
        return api(originalRequest);

      } catch (err) {
        clearTokens();
        window.location.href = "/login-page";
      }
    }

    return Promise.reject(error);
  }
);

export default api;