// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional: add auth/email headers here)
api.interceptors.request.use(
  (config) => {
    // Example: automatically add user email from localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      config.headers["X-User-Email"] = email; // custom header (optional)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data, // return only data
  (error) => {
    console.error("API Error:", error.response || error.message || error);
    return Promise.reject(error.response || { message: error.message });
  }
);

export default api;
