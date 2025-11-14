import React, { useEffect, useState } from "react";
import { getTickets } from "../services/service";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickets().then((all) => {
      setTickets(all.filter((t) => t.booked));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-ticket-perforated me-2"></i>
          My Booked Tickets
        </h2>
        <span 
          className="badge fs-6"
          style={{
            background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
            color: "white"
          }}
        >
          {tickets.length} Tickets
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-ticket-perforated display-1 text-muted mb-3"></i>
          <h4 className="text-muted mb-3">No Tickets Booked Yet</h4>
          <p className="text-muted mb-4">You haven't booked any tickets yet. Explore events and book your first ticket!</p>
          <a 
            href="/explore-events" 
            className="btn fw-semibold"
            style={{
              background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px"
            }}
          >
            <i className="bi bi-search me-2"></i>
            Explore Events
          </a>
        </div>
      ) : (
        <div className="row g-4">
          {tickets.map((t) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={t.id}>
              <div 
                className="card shadow-sm border-0 h-100"
                style={{ 
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-3">
                    <span 
                      className="badge mb-2"
                      style={{
                        background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                        color: "white"
                      }}
                    >
                      Confirmed
                    </span>
                    <h5 className="card-title fw-bold" style={{ color: "#1a1a1a" }}>{t.eventName}</h5>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt me-2" style={{ color: "#e43f5a" }}></i>
                      <small className="text-muted">{t.location}</small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-event me-2" style={{ color: "#e43f5a" }}></i>
                      <small className="text-muted">{t.date}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person me-2" style={{ color: "#e43f5a" }}></i>
                      <small className="text-muted">Seat: {t.seatNumber}</small>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Price Paid:</span>
                      <span className="fw-bold text-success fs-5">₹{t.price}</span>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-outline-primary fw-semibold"
                        onClick={() => window.print()}
                        style={{ borderRadius: "8px" }}
                      >
                        <i className="bi bi-printer me-2"></i>
                        Print Ticket
                      </button>
                      <button 
                        className="btn btn-outline-secondary fw-semibold"
                        onClick={() => window.location.href = `/ticket/${t.id}`}
                        style={{ borderRadius: "8px" }}
                      >
                        <i className="bi bi-eye me-2"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;