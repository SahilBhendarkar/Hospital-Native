import axios from "axios";

import { storage } from "../utils/storage";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await storage.load('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
