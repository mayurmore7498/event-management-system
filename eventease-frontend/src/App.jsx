import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizeEvent from "./pages/OrganizeEvent";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreEvents />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organize" element={<OrganizeEvent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
