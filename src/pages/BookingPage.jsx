import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { bookTicket } from "../services/ticketService";

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${eventId}`)
      .then(res => {
        setEvent(res.data);
        const cap = res.data.capacity || 20;
        const seatArr = Array.from({ length: cap }, (_, i) => ({ number: i+1, booked: false }));
        setSeats(seatArr);

        axios.get(`http://localhost:8080/api/tickets/event/${eventId}`)
          .then(r => {
            const bookedNumbers = r.data.map(t => t.seatNumber);
            setSeats(prev => prev.map(s => ({ ...s, booked: bookedNumbers.includes(s.number) })));
          })
          .catch(()=>{});
      });
  }, [eventId]);

  const handleSelect = (n) => {
    setSelected(n);
  };

  const handleBook = async () => {
    if (!selected) return alert("Please choose a seat.");
    try {
      const ticket = await bookTicket(parseInt(eventId), userId, selected);
      alert("Ticket created. Going to payment.");
      navigate(`/payment/${ticket.id}`);
    } catch (e) {
      console.error(e);
      alert("Booking failed: " + (e.response?.data || e.message));
    }
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
              <h3 className="fw-bold mb-0">
                <i className="bi bi-ticket-perforated me-2"></i>
                Book Tickets for {event.title}
              </h3>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="img-fluid rounded-3 mb-4"
                    style={{ height: "300px", objectFit: "cover", width: "100%" }}
                  />
                  <div className="mb-3">
                    <h5 className="fw-bold">Event Details</h5>
                    <p className="text-muted mb-2">
                      <i className="bi bi-calendar-event me-2" style={{ color: "#e43f5a" }}></i>
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-muted mb-2">
                      <i className="bi bi-geo-alt me-2" style={{ color: "#e43f5a" }}></i>
                      {event.location}
                    </p>
                    <p className="text-muted">
                      <i className="bi bi-currency-rupee me-2" style={{ color: "#e43f5a" }}></i>
                      ₹{event.ticketPrice} per ticket
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Select Your Seat</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {seats.map(s => (
                      <button 
                        key={s.number}
                        className={`btn ${s.booked ? 'btn-secondary' : (selected === s.number ? 'btn-success' : 'btn-outline-primary')}`}
                        disabled={s.booked}
                        onClick={() => handleSelect(s.number)}
                        style={{ 
                          width: '60px', 
                          height: '45px',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}
                      >
                        {s.number}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
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

                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-semibold">Selected Seat:</span>
                      <span className="fw-bold text-primary">{selected || 'None'}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="fw-semibold">Total Amount:</span>
                      <span className="fw-bold text-success fs-5">₹{selected ? event.ticketPrice : 0}</span>
                    </div>
                    
                    <button 
                      className="btn w-100 py-3 fw-bold"
                      onClick={handleBook} 
                      disabled={!selected}
                      style={{
                        background: selected 
                          ? "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)"
                          : "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        fontSize: "1.1rem"
                      }}
                      onMouseEnter={(e) => {
                        if (selected) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selected) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Proceed to Payment
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

export default BookingPage;