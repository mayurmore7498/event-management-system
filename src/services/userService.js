import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log(" No token found. User not logged in.");
    throw new Error("User not authenticated");
  }

  return axios.get(`${API_URL}/all`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};
