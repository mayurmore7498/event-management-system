import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";


export const bookTicket = async (ticketData) => {
  try {
    const res = await axios.post(`${API_URL}/book`, ticketData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error(" Error booking ticket:", err.response?.data || err.message);
    throw err;
  }
};


export const getTicketById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(" Error fetching ticket:", err.response?.data || err.message);
    throw err;
  }
};


export const markTicketPaid = async (id) => {
  try {
    const res = await axios.put(`${API_URL}/pay/${id}`, {}, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error(" Error marking ticket as paid:", err.response?.data || err.message);
    throw err;
  }
};


export const getEventTickets = async (eventId) => {
  try {
    const res = await axios.get(`${API_URL}/event/${eventId}`);
    return res.data;
  } catch (err) {
    console.error(" Error fetching event tickets:", err.response?.data || err.message);
    throw err;
  }
};
