import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import OrganizeEvent from "./pages/OrganizeEvent";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import MyTickets from "./pages/MyTickets";
import SelectSeats from "./pages/SelectSeats";
import TicketView from "./pages/TicketView";
import EditEvent from "./pages/EditEvent";
import About from "./pages/About";   

import MainLayout from "./layout/MainLayout";

import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ManageEvents from "./pages/Dashboard/Admin/ManageEvents";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import OrganizerDashboard from "./pages/Dashboard/OrganizerDashboard";
import ParticipantDashboard from "./pages/Dashboard/ParticipantDashboard";

const App = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase();

  return (
    <>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore-events" element={<ExploreEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/booking/:eventId" element={<BookingPage />} />
          <Route path="/select-seats/:id" element={<SelectSeats />} />
          <Route path="/pay/:bookingId" element={<PaymentPage />} />
          <Route path="/payment/:ticketId" element={<PaymentPage />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/ticket/:id" element={<TicketView />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/about" element={<About />} />   

          <Route
            path="/organize-event"
            element={role === "organizer" ? <OrganizeEvent /> : <Navigate to="/login" />}
          />

          <Route
            path="/dashboard"
            element={role ? <Navigate to={`/${role}/dashboard`} /> : <Navigate to="/login" />}
          />

          <Route path="/admin/dashboard" element={role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/organizer/dashboard" element={role === "organizer" ? <OrganizerDashboard /> : <Navigate to="/login" />} />
          <Route path="/participant/dashboard" element={role === "participant" ? <ParticipantDashboard /> : <Navigate to="/login" />} />

          <Route path="/admin/manage-events" element={role === "admin" ? <ManageEvents /> : <Navigate to="/login" />} />
          <Route path="/admin/manage-users" element={role === "admin" ? <ManageUsers /> : <Navigate to="/login" />} />

          <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${role}/dashboard`} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={`/${role}/dashboard`} />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;