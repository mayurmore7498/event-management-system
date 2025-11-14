import React from "react";
import { useLocation, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const BookingSuccess = () => {
  const { state: ticket } = useLocation();

  if (!ticket) return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body p-5">
          <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
          <h4 className="text-danger mb-3">No ticket found</h4>
          <p className="text-muted">Please go back and try booking again.</p>
          <Link 
            to="/explore-events" 
            className="btn fw-semibold"
            style={{
              background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px"
            }}
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );

  const qrValue = `
  Ticket ID: ${ticket.id}
  Event: ${ticket.event?.title}
  Seats: ${ticket.seats?.join(", ")}
  Total: ₹${ticket.totalPrice || ticket.amount}
  Date: ${ticket.event?.date}
  `;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div 
            className="card shadow-lg border-0 mx-auto text-center"
            style={{ 
              borderRadius: "20px",
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              color: "white"
            }}
          >
            <div className="card-body p-5">
              <div className="mb-4">
                <i className="bi bi-check-circle display-1 text-success mb-3"></i>
                <h3 className="fw-bold mb-2">🎉 Booking Confirmed!</h3>
                <p className="mb-0 opacity-75">Your ticket has been booked successfully.</p>
              </div>
              
              <div 
                className="bg-white p-4 rounded-3 d-inline-block mb-4"
                style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              >
                <QRCodeCanvas value={qrValue} size={180} includeMargin={true} />
              </div>
              
              <div className="bg-white rounded-3 p-3 mb-4">
                <h6 className="text-dark fw-bold mb-2">Booking Details</h6>
                <p className="text-muted mb-1">
                  <strong>Ticket ID:</strong> #{ticket.id}
                </p>
                <p className="text-muted mb-1">
                  <strong>Event:</strong> {ticket.event?.title}
                </p>
                <p className="text-muted mb-1">
                  <strong>Seats:</strong> {ticket.seats?.join(", ")}
                </p>
                <p className="text-muted mb-0">
                  <strong>Amount Paid:</strong> ₹{ticket.totalPrice || ticket.amount}
                </p>
              </div>
              
              <p className="mb-4 opacity-75">
                <i className="bi bi-info-circle me-2"></i>
                Show this QR code at the event entry
              </p>
              
              <div className="d-flex gap-3 justify-content-center">
                <Link 
                  to="/explore-events" 
                  className="btn btn-light fw-semibold"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="bi bi-search me-2"></i>
                  Explore More Events
                </Link>
                <Link 
                  to="/participant/dashboard" 
                  className="btn btn-outline-light fw-semibold"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="bi bi-ticket-perforated me-2"></i>
                  My Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;