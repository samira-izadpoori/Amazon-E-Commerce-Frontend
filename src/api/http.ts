
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:4000",
});



http.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth_v1");
  if (raw) {
    const { token } = JSON.parse(raw) as { token?: string };
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});