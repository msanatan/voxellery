import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

const backendApiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

backendApiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuth();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backendApiClient;
