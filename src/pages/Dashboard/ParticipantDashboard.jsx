import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import MainLayout from "../../layout/MainLayout";

const ParticipantDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/bookings/user/${userId}`
        );

        const updated = (res.data || []).map((b) => ({
          ...b,
          qrCodeDataUrl: b.qrCode
            ? `data:image/png;base64,${b.qrCode}`
            : null,
        }));

        setBookings(updated);
      } catch (error) {
        console.error(" Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [userId]);

  const cancelTicket = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;

    try {
      await axios.put(`http://localhost:8080/api/bookings/cancel/${bookingId}`);
      alert(" Ticket Cancelled Successfully!");
      window.location.reload();
    } catch (error) {
      alert(" Failed to cancel ticket");
      console.error(error);
    }
  };

  const downloadQR = (qrData, bookingId) => {
    const link = document.createElement("a");
    link.href = qrData;
    link.download = `ticket_${bookingId}.png`;
    link.click();
  };

  const downloadPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🎟 EVENT TICKET", 70, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking.id}`, 20, 40);
    doc.text(`Event: ${booking.event.title}`, 20, 50);
    doc.text(`Seats: ${booking.seats.join(", ")}`, 20, 60);
    doc.text(`Amount: ₹${booking.amount}`, 20, 70);
    doc.text(`Status: ${booking.status}`, 20, 80);
    doc.text(`Date: ${booking.event.date}`, 20, 90);
    doc.text(`Venue: ${booking.event.location}`, 20, 100);

    if (booking.qrCodeDataUrl) {
      doc.addImage(booking.qrCodeDataUrl, "PNG", 60, 90, 80, 80);
    }

    doc.save(`Ticket_${booking.id}.pdf`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Fetching your tickets...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary mb-1">
              <i className="bi bi-ticket-perforated me-2"></i>
              My Ticket Dashboard
            </h2>
            <p className="text-muted mb-0">Your booked tickets are listed below</p>
          </div>
          <span className="badge bg-primary fs-6">{bookings.length} Tickets</span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-ticket-perforated display-1 text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Tickets Booked Yet</h4>
            <p className="text-muted mb-4">Explore events and book your first ticket!</p>
            <a href="/explore-events" className="btn btn-primary">
              <i className="bi bi-search me-2"></i>
              Explore Events
            </a>
          </div>
        ) : (
          <div className="row g-4">
            {bookings.map((b) => (
              <div key={b.id} className="col-lg-6">
                <div 
                  className="card shadow-sm border-0 h-100"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title fw-bold mb-1">
                          Booking #{b.id}
                        </h5>
                        <span
                          className={`badge ${
                            b.status === "CONFIRMED"
                              ? "bg-success"
                              : b.status === "PENDING"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="text-end">
                        <h4 className="text-primary fw-bold">₹{b.amount}</h4>
                        <small className="text-muted">{b.seats?.length} seat(s)</small>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">{b.event?.title}</h6>
                      <div className="row text-muted small">
                        <div className="col-6">
                          <i className="bi bi-calendar me-2"></i>
                          {b.event.date}
                        </div>
                        <div className="col-6">
                          <i className="bi bi-geo-alt me-2"></i>
                          {b.event.location}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong>Seats:</strong> 
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {b.seats?.map((seat, index) => (
                          <span key={index} className="badge bg-light text-dark border">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {b.qrCodeDataUrl && (
                      <div className="text-center border-top pt-4">
                        <div className="mb-3">
                          <img
                            src={b.qrCodeDataUrl}
                            alt="QR Ticket"
                            style={{ 
                              width: 150, 
                              height: 150,
                              border: "2px solid #e9ecef",
                              borderRadius: "8px"
                            }}
                          />
                        </div>

                        <div className="d-flex gap-2 justify-content-center flex-wrap">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => downloadQR(b.qrCodeDataUrl, b.id)}
                          >
                            <i className="bi bi-download me-1"></i>
                            PNG
                          </button>

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => downloadPDF(b)}
                          >
                            <i className="bi bi-file-pdf me-1"></i>
                            PDF
                          </button>

                          {b.status === "CONFIRMED" && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => cancelTicket(b.id)}
                            >
                              <i className="bi bi-x-circle me-1"></i>
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ParticipantDashboard;