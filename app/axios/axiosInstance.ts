import axios from "axios";
import { getItem, removeItem, saveItem } from "../context/AuthContext";
import Constants from "expo-constants";

const { API_URL } = Constants?.expoConfig?.extra!;

// Base instance
const api = axios.create({
    baseURL: API_URL || "http://192.168.43.142:5011/api",
    // timeout: 10000,
    // withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const accessToken = await getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await api.post("/auth/refresh-token", {});

                const newAccessToken = data.accessToken;
                await saveItem("accessToken",newAccessToken);

                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshErr) {
                await removeItem("accessToken");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
