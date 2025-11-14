import axios from "axios";
const API_URL = "http://localhost:8080/api/payments";

export const savePayment = async (paymentData) => {
  const res = await axios.post(`${API_URL}/save`, paymentData);
  return res.data;
};
