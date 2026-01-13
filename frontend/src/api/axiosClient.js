import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://interview-prep-app-9jbs.onrender.com/api",
    withCredentials: true
});

console.log("env_url:",import.meta.env.VITE_BACKEND_URL)

export default axiosClient;
