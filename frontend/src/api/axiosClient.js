import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://interview-prep-app-9jbs.onrender.com",
    withCredentials: true
});

export default axiosClient;
