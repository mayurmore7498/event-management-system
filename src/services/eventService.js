import axios from "axios";

const API_URL = "http://localhost:8080/api";
const ADMIN_API = "http://localhost:8080/api/admin";


export const getPendingEvents = async () => {
  const res = await axios.get(`${API_URL}/admin/pending`);
  return res.data;
};

export const approveEvent = async (id) => {
  const res = await axios.put(`${API_URL}/admin/approve/${id}`);
  return res.data;
};

export const rejectEvent = async (id) => {
  const res = await axios.put(`${API_URL}/admin/reject/${id}`);
  return res.data;
};

export const getOrganizerEvents = async (id) => {
  const res = await axios.get(`${API_URL}/events/organizer/${id}`);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await axios.post(`${API_URL}/events/create`, data);
  return res.data;
};

export const getOrganizerSummary = async (organizerId) => {
  const res = await axios.get(`${API_URL}/events/organizer/summary/${organizerId}`);
  return res.data;
};



export const getAllEvents = async () => {
  const res = await axios.get(`${ADMIN_API}/events`);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${ADMIN_API}/events/${id}`);
  return res.data;
};
