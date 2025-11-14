import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events/approved")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching approved events", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          <i className="bi bi-search me-2"></i>
          Explore Events
        </h2>
        <p className="text-muted fs-5">
          Discover amazing events happening around you
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
          <h4 className="text-muted">No events available</h4>
          <p className="text-muted">Check back later for new events!</p>
        </div>
      ) : (
        <div className="row g-4">
          {events.map((event) => (
            <div key={event.id} className="col-xl-4 col-lg-6 col-md-6">
              <div 
                className="card shadow-sm border-0 h-100"
                style={{
                  borderRadius: "16px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={event.image || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=600&q=80"}
                    className="card-img-top"
                    alt={event.title}
                    style={{ 
                      height: "220px", 
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
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
                    ₹{event.ticketPrice || "Free"}
                  </div>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold mb-3" style={{ color: "#1a1a1a", minHeight: "56px" }}>
                    {event.title}
                  </h5>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-event me-2" style={{ color: "#e43f5a" }}></i>
                      <span className="text-muted small">
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short'
                        })}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt me-2" style={{ color: "#e43f5a" }}></i>
                      <span className="text-muted small">{event.location}</span>
                    </div>
                  </div>

                  <p 
                    className="card-text text-secondary mb-4 flex-grow-1"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {event.description?.slice(0, 100)}...
                  </p>

                  <Link 
                    to={`/event/${event.id}`} 
                    className="btn w-100 py-2 fw-semibold"
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
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;