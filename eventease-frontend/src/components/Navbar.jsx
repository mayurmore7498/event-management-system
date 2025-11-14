import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">EventEase</Link>
    <Link to="/explore">Explore Events</Link>
    <Link to="/organize">Organize Event</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/login">Login/Register</Link>
  </nav>
);

export default Navbar;
