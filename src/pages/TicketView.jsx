import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TicketView = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/bookings/${id}`)
      .then((res) => {
        setTicket({
          ...res.data,
          qrCodeDataUrl: res.data.qrCode
            ? `data:image/png;base64,${res.data.qrCode}`
            : null,
        });
      })
      .catch(error => {
        console.error("Error fetching ticket:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading ticket details...</p>
    </div>
  );

  if (!ticket) return (
    <div className="container py-5 text-center">
      <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
      <h4 className="text-danger mb-3">Ticket not found</h4>
      <p className="text-muted">The ticket you're looking for doesn't exist.</p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div 
            className="card shadow-lg border-0 text-center"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "20px"
            }}
          >
            <div className="card-body p-5">
              <div className="mb-4">
                <i className="bi bi-ticket-perforated display-1 text-warning mb-3"></i>
                <h2 className="fw-bold mb-2">Digital Ticket</h2>
                <h4 className="text-warning fw-bold">#{ticket.id}</h4>
              </div>

              <div className="bg-white rounded-3 p-4 mb-4">
                <h4 className="text-primary fw-bold mb-3">{ticket.event?.title}</h4>
                
                <div className="row text-dark text-start mb-3">
                  <div className="col-6">
                    <p className="mb-2">
                      <strong>Amount Paid:</strong>
                    </p>
                    <p className="mb-2">
                      <strong>Seats:</strong>
                    </p>
                    <p className="mb-0">
                      <strong>Status:</strong>
                    </p>
                  </div>
                  <div className="col-6 text-end">
                    <p className="mb-2 text-success fw-bold">₹{ticket.amount}</p>
                    <p className="mb-2 fw-bold">{ticket.seats?.join(", ")}</p>
                    <p className="mb-0">
                      <span className={`badge ${
                        ticket.status === "CONFIRMED" ? "bg-success" : 
                        ticket.status === "PENDING" ? "bg-warning text-dark" : "bg-secondary"
                      }`}>
                        {ticket.status}
                      </span>
                    </p>
                  </div>
                </div>

                {ticket.qrCodeDataUrl && (
                  <div className="text-center mt-4">
                    <img
                      src={ticket.qrCodeDataUrl}
                      alt="QR Code"
                      style={{ 
                        width: 200, 
                        height: 200, 
                        border: "2px solid #444", 
                        padding: "8px", 
                        borderRadius: "12px",
                        background: "white"
                      }}
                    />
                    <p className="text-muted mt-2 mb-0">Scan QR code at entry</p>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button 
                  className="btn btn-light fw-semibold"
                  onClick={() => window.print()}
                  style={{ borderRadius: "10px" }}
                >
                  <i className="bi bi-printer me-2"></i>
                  Print Ticket
                </button>
                <button 
                  className="btn btn-outline-light fw-semibold"
                  onClick={() => window.history.back()}
                  style={{ borderRadius: "10px" }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;