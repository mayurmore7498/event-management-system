import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const role = user?.role?.toLowerCase();

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        padding: "1rem 0",
        boxShadow: "0 2px 20px rgba(0,0,0,0.1)"
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand fw-bold" 
          to="/"
          style={{
            fontSize: "1.8rem",
            background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none"
          }}
        >
          EventEase
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link 
                className="nav-link position-relative fw-semibold"
                to="/"
                style={{ 
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                onMouseLeave={(e) => e.target.style.color = "#ffffff"}
              >
                Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link 
                className="nav-link position-relative fw-semibold"
                to="/explore-events"
                style={{ 
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                onMouseLeave={(e) => e.target.style.color = "#ffffff"}
              >
                Explore Events
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link 
                className="nav-link position-relative fw-semibold"
                to="/about"
                style={{ 
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                onMouseLeave={(e) => e.target.style.color = "#ffffff"}
              >
                About
              </Link>
            </li>

            {role === "organizer" && (
              <li className="nav-item mx-2">
                <Link 
                  className="nav-link position-relative fw-semibold"
                  to="/organize-event"
                  style={{ 
                    color: "#ffffff",
                    fontSize: "1rem",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                  onMouseLeave={(e) => e.target.style.color = "#ffffff"}
                >
                  Organize Event
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item mx-2">
                <Link 
                  className="nav-link position-relative fw-semibold"
                  to="/dashboard"
                  style={{ 
                    color: "#ffffff",
                    fontSize: "1rem",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                  onMouseLeave={(e) => e.target.style.color = "#ffffff"}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item mx-2">
                  <Link 
                    className="btn btn-outline-light px-4 fw-semibold"
                    to="/login"
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e43f5a",
                      color: "#e43f5a",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#e43f5a";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#e43f5a";
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link 
                    className="btn px-4 fw-semibold"
                    to="/register"
                    style={{
                      background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #d42a45 0%, #c21532 100%)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center mx-3">
                  <span 
                    style={{ 
                      color: "#ffffff",
                      fontWeight: "500"
                    }}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    Welcome, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light px-4 fw-semibold"
                    onClick={handleLogout}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #dc3545",
                      color: "#dc3545",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#dc3545";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#dc3545";
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;