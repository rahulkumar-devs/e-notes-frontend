import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
