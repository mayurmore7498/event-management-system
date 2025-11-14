import axios from "axios";
const API = "http://localhost:8080/api/payments";

export const createOrder = (amount, ticketId) => {
  return axios.post(`${API}/create-order`, { amount, ticketId });
};

export const verifyPayment = (payload) => {
  return axios.post(`${API}/verify`, payload);
};
