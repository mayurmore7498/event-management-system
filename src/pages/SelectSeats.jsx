import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectSeats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventAndBookings = async () => {
      try {
        const eventRes = await axios.get(`http://localhost:8080/api/events/${id}`);
        setEvent(eventRes.data);

        const bookingsRes = await axios.get(`http://localhost:8080/api/bookings/event/${id}`);
        const allBookings = bookingsRes.data || [];

        const takenSeats = [];
        allBookings.forEach((b) => {
          if (b.status === "CONFIRMED" && Array.isArray(b.seats)) {
            takenSeats.push(...b.seats);
          }
        });
        setBookedSeats(takenSeats.map(String));
      } catch (err) {
        console.error("Error fetching event or bookings:", err);
        alert("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndBookings();
  }, [id]);

  const seats = [];
  const capacity = event?.capacity || 0;
  for (let i = 1; i <= capacity; i++) seats.push(i);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(String(seat))) return;
    setSelectedSeats((prev) =>
      prev.includes(String(seat))
        ? prev.filter((s) => s !== String(seat))
        : [...prev, String(seat)]
    );
  };

  const proceedToPay = async () => {
    if (selectedSeats.length === 0) return alert("Please select at least one seat.");

    const amount = (event.ticketPrice || 0) * selectedSeats.length;

    try {
      const res = await axios.post("http://localhost:8080/api/bookings/reserve", {
        eventId: event.id,
        userId: localStorage.getItem("id"),
        userName: localStorage.getItem("name"),
        userEmail: localStorage.getItem("email"),
        seats: selectedSeats,
        amount,
      });

      const booking = res.data;
      if (booking && booking.id) {
        navigate(`/pay/${booking.id}`);
      } else {
        alert("Reservation failed, please try again.");
      }
    } catch (err) {
      console.error("Error reserving seats:", err);
      alert(err?.response?.data?.message || "Seat reservation failed.");
    }
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading seat selection...</p>
    </div>
  );
  
  if (!event) return (
    <div className="container py-5 text-center">
      <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
      <h4 className="text-danger mb-3">Event not found</h4>
      <p className="text-muted">The event you're looking for doesn't exist.</p>
      <button className="btn btn-primary" onClick={() => navigate("/explore-events")}>
        Browse Events
      </button>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-transparent border-0 py-4">
              <h3 className="fw-bold text-primary mb-2">
                <i className="bi bi-ticket-perforated me-2"></i>
                Select Seats for {event.title}
              </h3>
              <p className="text-muted mb-0">
                <i className="bi bi-currency-rupee me-1"></i>
                ₹{event.ticketPrice} per seat
              </p>
            </div>
            
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center gap-4 mb-3 flex-wrap">
                  <div className="d-flex align-items-center">
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#0d6efd', borderRadius: '4px', marginRight: '8px' }}></div>
                    <small>Available</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#198754', borderRadius: '4px', marginRight: '8px' }}></div>
                    <small>Selected</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#6c757d', borderRadius: '4px', marginRight: '8px' }}></div>
                    <small>Booked</small>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div 
                  className="bg-light rounded-3 p-3 mx-auto"
                  style={{ maxWidth: '600px' }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {seats.map((seat) => {
                      const isTaken = bookedSeats.includes(String(seat));
                      const isSelected = selectedSeats.includes(String(seat));

                      return (
                        <button
                          key={seat}
                          className={`btn ${
                            isTaken
                              ? "btn-secondary"
                              : isSelected
                              ? "btn-success"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => toggleSeat(seat)}
                          disabled={isTaken}
                          style={{ 
                            width: 70, 
                            height: 50, 
                            fontWeight: "bold",
                            borderRadius: "8px"
                          }}
                        >
                          {seat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-top pt-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Selected Seats:</strong>
                      <div className="mt-1">
                        {selectedSeats.length > 0 ? (
                          <div className="d-flex flex-wrap gap-1">
                            {selectedSeats.map(seat => (
                              <span key={seat} className="badge bg-success fs-6">
                                {seat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted">No seats selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 text-md-end">
                    <div className="mb-3">
                      <strong>Total Amount:</strong>
                      <h4 className="text-success fw-bold">
                        ₹{(event.ticketPrice || 0) * selectedSeats.length}
                      </h4>
                    </div>
                    
                    <button
                      className="btn btn-primary btn-lg fw-bold px-5"
                      onClick={proceedToPay}
                      disabled={selectedSeats.length === 0}
                      style={{
                        background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                        border: "none",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSeats.length > 0) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSeats.length > 0) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeats;