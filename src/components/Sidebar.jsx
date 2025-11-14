import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const role = localStorage.getItem("role"); 

  const menuItems = {
    PARTICIPANT: [
      { path: "/explore-events", label: "Explore Events", icon: "bi-search" },
      { path: "/participant/dashboard", label: "My Tickets", icon: "bi-ticket-perforated" },
      { path: "/profile", label: "My Profile", icon: "bi-person" }
    ],
    ORGANIZER: [
      { path: "/organize-event", label: "Organize Event", icon: "bi-plus-circle" },
      { path: "/organizer/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
      { path: "/my-events", label: "My Events", icon: "bi-calendar-event" },
      { path: "/profile", label: "My Profile", icon: "bi-person" }
    ],
    ADMIN: [
      { path: "/admin/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
      { path: "/admin/manage-users", label: "Manage Users", icon: "bi-people" },
      { path: "/admin/manage-events", label: "Manage Events", icon: "bi-calendar-check" }
    ]
  };

  const currentItems = menuItems[role] || [];

  return (
    <div
      className="d-flex flex-column p-4 text-white position-fixed h-100"
      style={{ 
        width: "280px", 
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow: "4px 0 15px rgba(0,0,0,0.1)"
      }}
    >
      <div className="text-center mb-5">
        <h3 
          className="fw-bold mb-0"
          style={{
            background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          EventEase
        </h3>
        <small className="text-muted">Event Management Portal</small>
      </div>

      <div className="flex-grow-1">
        {currentItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="d-flex align-items-center text-white text-decoration-none mb-3 p-3 rounded"
            style={{
              transition: "all 0.3s ease",
              background: "transparent"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(228, 63, 90, 0.1)";
              e.target.style.transform = "translateX(8px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateX(0)";
            }}
          >
            <i className={`${item.icon} me-3`} style={{ color: "#e43f5a", fontSize: "1.1rem" }}></i>
            <span className="fw-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      <hr className="text-secondary my-4" />

      <button
        className="btn fw-semibold py-2"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        style={{
          background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 15px rgba(220, 53, 69, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;