import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "https://medoswift-api.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
