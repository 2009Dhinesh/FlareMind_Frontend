// api/client.js
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/user", // adjust if needed
});

// 🔑 Add token automatically
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or AsyncStorage in RN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
