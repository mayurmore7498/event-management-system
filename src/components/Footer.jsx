import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer 
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        paddingTop: "3rem",
        paddingBottom: "1.5rem",
        marginTop: "4rem"
      }}
    >
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h4 
              className="fw-bold mb-3"
              style={{ 
                color: "#e43f5a",
                fontSize: "1.5rem"
              }}
            >
              EventEase
            </h4>
            <p style={{ color: "#b0b0b0", lineHeight: "1.6" }}>
              Empowering organizers and participants to connect, manage, and
              celebrate events effortlessly. Your one-stop destination for unforgettable experiences.
            </p>
            <div className="d-flex gap-3 mt-3">
              <i className="bi bi-facebook" style={{ color: "#b0b0b0", fontSize: "1.2rem", cursor: "pointer" }}></i>
              <i className="bi bi-twitter" style={{ color: "#b0b0b0", fontSize: "1.2rem", cursor: "pointer" }}></i>
              <i className="bi bi-instagram" style={{ color: "#b0b0b0", fontSize: "1.2rem", cursor: "pointer" }}></i>
              <i className="bi bi-linkedin" style={{ color: "#b0b0b0", fontSize: "1.2rem", cursor: "pointer" }}></i>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: "#ffffff" }}>Quick Links</h5>
            <ul className="list-unstyled">
              {[
                { path: "/", label: "Home" },
                { path: "/explore-events", label: "Explore Events" },
                { path: "/organize-event", label: "Organize Event" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/about", label: "About Us" }
              ].map((link, index) => (
                <li key={index} className="mb-2">
                  <Link 
                    to={link.path} 
                    className="text-decoration-none"
                    style={{ 
                      color: "#b0b0b0",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#e43f5a"}
                    onMouseLeave={(e) => e.target.style.color = "#b0b0b0"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: "#ffffff" }}>Contact Us</h5>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-envelope me-2" style={{ color: "#e43f5a" }}></i>
              <span style={{ color: "#b0b0b0" }}>support@eventease.com</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-telephone me-2" style={{ color: "#e43f5a" }}></i>
              <span style={{ color: "#b0b0b0" }}>+91 98765 43210</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-geo-alt me-2" style={{ color: "#e43f5a" }}></i>
              <span style={{ color: "#b0b0b0" }}>Pune, Maharashtra, India</span>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#444", margin: "2rem 0 1rem" }} />

        <div className="text-center">
          <p style={{ color: "#b0b0b0", margin: 0 }}>
            &copy; {new Date().getFullYear()} <strong style={{ color: "#e43f5a" }}>EventEase</strong>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;