import axios from "axios";

const client = axios.create({
  baseURL: "https://flaremind-backend.onrender.com/user", 
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;




