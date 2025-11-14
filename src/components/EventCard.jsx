import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../constants/theme";

const EventCard = ({ event }) => {
  const { id, title, date, location, description, image, ticketPrice } = event;

  return (
    <div 
      className="card event-card h-100 border-0"
      style={{ 
        borderRadius: theme.borderRadius.large,
        transition: "all 0.3s ease",
        overflow: "hidden",
        background: theme.colors.cardBackground,
        boxShadow: theme.shadows.small
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={image || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
          className="card-img-top"
          alt={title}
          style={{
            height: "200px",
            objectFit: "cover",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <div 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          ₹{ticketPrice || "Free"}
        </div>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h5 
          className="card-title fw-bold mb-2"
          style={{ 
            color: theme.colors.text.primary,
            fontSize: "1.1rem",
            lineHeight: "1.4",
            minHeight: "50px"
          }}
        >
          {title}
        </h5>

        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-calendar-event me-2" style={{ color: theme.colors.primary }}></i>
            <span className="text-muted small">
              {new Date(date).toLocaleDateString('en-IN', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short'
              })}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt me-2" style={{ color: theme.colors.primary }}></i>
            <span className="text-muted small">{location}</span>
          </div>
        </div>

        <p 
          className="card-text flex-grow-1 text-secondary mb-3"
          style={{ 
            fontSize: "0.85rem",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {description?.slice(0, 80)}{description?.length > 80 ? "..." : ""}
        </p>

        <Link 
          to={`/event/${id}`} 
          className="btn w-100 py-2 fw-semibold"
          style={{
            background: theme.colors.primaryGradient,
            color: theme.colors.text.light,
            border: "none",
            borderRadius: theme.borderRadius.small,
            fontSize: "0.9rem",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #d42a45 0%, #c21532 100%)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 15px rgba(228, 63, 90, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.colors.primaryGradient;
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;