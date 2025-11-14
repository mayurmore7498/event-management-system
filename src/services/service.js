import axios from "axios";
const API_URL = "http://localhost:8080/api";

export const getTickets = async () => {
  const res = await axios.get(`${API_URL}/tickets`);
  return res.data;
};

export const getTicketById = async (id) => {
  const res = await axios.get(`${API_URL}/tickets/${id}`);
  return res.data;
};

export const createOrder = async (amount, ticketId) => {
  const res = await axios.post(`${API_URL}/payments/create-order`, { amount, ticketId });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axios.post(`${API_URL}/payments/verify`, data);
  return res.data;
};
