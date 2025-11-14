import React, { useEffect, useState } from "react";
import { getTickets } from "../services/service";
import { useNavigate } from "react-router-dom";

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-ticket-perforated me-2"></i>
          Available Tickets
        </h2>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-ticket-perforated display-1 text-muted mb-3"></i>
          <h4 className="text-muted">No tickets available</h4>
          <p className="text-muted">Check back later for new tickets.</p>
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
                      className={`badge mb-2 ${
                        t.booked 
                          ? 'bg-secondary' 
                          : 'bg-success'
                      }`}
                    >
                      {t.booked ? "Booked" : "Available"}
                    </span>
                    <h5 className="card-title fw-bold text-dark">{t.eventName}</h5>
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
                      <span className="text-muted">Price:</span>
                      <span className="fw-bold text-success fs-5">₹{t.price}</span>
                    </div>
                    
                    <button
                      className="btn w-100 fw-semibold"
                      onClick={() => navigate(`/payment/${t.id}`)}
                      disabled={t.booked}
                      style={{
                        background: t.booked ? 
                          "linear-gradient(135deg, #6c757d 0%, #5a6268 100%)" : 
                          "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (!t.booked) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!t.booked) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      {t.booked ? (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Already Booked
                        </>
                      ) : (
                        <>
                          <i className="bi bi-credit-card me-2"></i>
                          Book Now
                        </>
                      )}
                    </button>
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

export default TicketListPage;