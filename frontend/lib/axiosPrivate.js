import axios from "axios";
const BACKEND_BASE_URL = "http://localhost:8081";

// export const axiosPublic = axios.create({
//     baseURL: BACKEND_BASE_URL
// });

export const axiosPrivate = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

