// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // غيّريها حسب سيرفرك
  withCredentials: true,
});

export default api;
