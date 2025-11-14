import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const authService = {
  getAll: async () => await axios.get(`${API_URL}/authService`),
};
