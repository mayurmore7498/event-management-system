import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8080/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading event details...</p>
      </div>
    );

  if (!event)
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
        <h4 className="text-danger mb-3">Event not found</h4>
        <p className="text-muted">The event you're looking for doesn't exist.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate("/explore-events")}
        >
          Browse Events
        </button>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="row g-0 align-items-stretch">
          <div className="col-lg-6">
            <img
              src={event.image || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80"}
              className="img-fluid w-100 h-100"
              alt={event.title}
              style={{ 
                objectFit: "cover",
                minHeight: "500px"
              }}
            />
          </div>

          <div className="col-lg-6 p-4 p-lg-5">
            <div className="d-flex flex-column h-100">
              <div className="mb-4">
                <h1 className="fw-bold text-primary mb-3">{event.title}</h1>
                <p className="text-muted fs-5 mb-4">{event.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Event Details</h5>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Location</small>
                        <p className="fw-semibold mb-0">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar-event text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Date</small>
                        <p className="fw-semibold mb-0">
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-currency-rupee text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Ticket Price</small>
                        <p className="fw-semibold mb-0">₹{event.ticketPrice}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Capacity</small>
                        <p className="fw-semibold mb-0">{event.capacity} seats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-lg fw-bold py-3"
                    onClick={() => navigate(`/select-seats/${event.id}`)}
                    style={{
                      background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Book Tickets Now
                  </button>
                  
                  <button
                    className="btn btn-outline-primary btn-lg fw-bold py-3"
                    onClick={() => navigate("/explore-events")}
                    style={{
                      borderRadius: "12px",
                      fontSize: "1rem"
                    }}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;