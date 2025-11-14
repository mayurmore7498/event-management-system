import axios from "axios";
const API = "http://localhost:8080/api/tickets";

export const bookTicket = async (eventId, userId, seatNumber) => {
  
  const res = await axios.post(`${API}`, {}, {
    params: { eventId, userId, seatNumber },
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data;
};

export const getTicket = async (id) => {
  const res = await axios.get(`http://localhost:8080/api/tickets/${id}`);
  return res.data;
};

export const getUserTickets = async (userId) => {
  const res = await axios.get(`http://localhost:8080/api/tickets/user/${userId}`);
  return res.data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const res = await axios.put(`http://localhost:8080/api/tickets/${ticketId}/status`, null, {
    params: { status }
  });
  return res.data;
};
