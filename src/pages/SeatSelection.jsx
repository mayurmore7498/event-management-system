import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SeatSelection = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const rows = 5, cols = 8;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${eventId}`).then(res => setEvent(res.data));
    
    axios.get(`http://localhost:8080/api/tickets/booked-seats/${eventId}`)
      .then(res => setBookedSeats(res.data))
      .catch(() => setBookedSeats([]));
  }, [eventId]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleProceedPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    const totalPrice = selectedSeats.length * event.ticketPrice;
    navigate("/payment", {
      state: { eventId, selectedSeats, totalPrice },
    });
  };

  if (!event) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading event details...</p>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div 
            className="card shadow-sm border-0"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "16px"
            }}
          >
            <div 
              className="card-header bg-transparent border-0 py-4"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                color: "white",
                borderRadius: "16px 16px 0 0"
              }}
            >
              <h3 className="fw-bold mb-2">
                <i className="bi bi-ticket-perforated me-2"></i>
                Select Your Seats for {event.title}
              </h3>
              <p className="mb-0 opacity-75">
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
                <div className="bg-light rounded-3 p-4 d-inline-block">
                  {Array.from({ length: rows }).map((_, r) => (
                    <div key={r} className="d-flex justify-content-center mb-2">
                      {Array.from({ length: cols }).map((_, c) => {
                        const seat = `${String.fromCharCode(65 + r)}${c + 1}`;
                        const isBooked = bookedSeats.includes(seat);
                        const isSelected = selectedSeats.includes(seat);
                        return (
                          <div
                            key={seat}
                            onClick={() => handleSeatClick(seat)}
                            className={`seat m-1 p-2 rounded text-white fw-bold ${
                              isBooked ? "bg-secondary" : isSelected ? "bg-success" : "bg-primary"
                            }`}
                            style={{
                              width: 45,
                              height: 45,
                              cursor: isBooked ? "not-allowed" : "pointer",
                              transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              if (!isBooked && !isSelected) {
                                e.target.style.transform = "scale(1.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isBooked && !isSelected) {
                                e.target.style.transform = "scale(1)";
                              }
                            }}
                          >
                            {seat}
                          </div>
                        );
                      })}
                    </div>
                  ))}
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
                              <span 
                                key={seat} 
                                className="badge fs-6"
                                style={{
                                  background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                                  color: "white"
                                }}
                              >
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
                        ₹{selectedSeats.length * event.ticketPrice}
                      </h4>
                    </div>
                    
                    <button
                      className="btn btn-lg fw-bold px-5"
                      onClick={handleProceedPayment}
                      disabled={selectedSeats.length === 0}
                      style={{
                        background: selectedSeats.length > 0 
                          ? "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)"
                          : "#6c757d",
                        color: "white",
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

export default SeatSelection;