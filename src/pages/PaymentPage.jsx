import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        alert("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const openCheckout = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    if (!booking?.razorpayOrderId) {
      return alert("Order not ready for payment.");
    }

    const options = {
      key: "rzp_test_RZkjudPIMVA8G7",
      order_id: booking.razorpayOrderId,
      amount: Math.round(booking.amount * 100),
      currency: "INR",
      name: "EventEase",
      description: `Payment for Booking #${booking.id}`,
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      handler: async function (response) {
        try {
          await axios.post("http://localhost:8080/api/bookings/confirm", {
            bookingId: booking.id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });

          alert(" Payment successful! Your booking is confirmed.");
          navigate("/participant/dashboard");
        } catch (err) {
          console.error("Payment verification failed:", err);
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: booking.userName || "Guest User",
        email: "demo@example.com",
        contact: "9999999999",
      },
      notes: {
        booking_id: booking.id,
      },
      theme: {
        color: "#e43f5a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading booking details...</p>
    </div>
  );
  
  if (!booking) return (
    <div className="container py-5 text-center">
      <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
      <h4 className="text-danger mb-3">Booking not found</h4>
      <p className="text-muted">The booking you're looking for doesn't exist.</p>
      <button className="btn btn-primary" onClick={() => navigate("/explore-events")}>
        Browse Events
      </button>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-transparent border-0 py-4 text-center">
              <h3 className="fw-bold text-primary mb-2">
                <i className="bi bi-credit-card me-2"></i>
                Complete Your Payment
              </h3>
              <p className="text-muted mb-0">Secure payment via Razorpay</p>
            </div>
            
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div 
                  className="bg-primary bg-opacity-10 rounded-3 p-4 d-inline-block mb-3"
                >
                  <i className="bi bi-shield-check display-4 text-primary"></i>
                </div>
                <h5 className="fw-bold">Booking ID: #{booking.id}</h5>
              </div>

              <div className="mb-4">
                <div className="border rounded-3 p-3 mb-3">
                  <h6 className="fw-bold mb-3">Booking Summary</h6>
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Seats</small>
                      <p className="fw-semibold mb-0">{booking.seats?.join(", ")}</p>
                    </div>
                    <div className="col-6 text-end">
                      <small className="text-muted">Total Amount</small>
                      <p className="fw-bold text-success fs-5 mb-0">₹{booking.amount}</p>
                    </div>
                  </div>
                </div>

                {booking.event && (
                  <div className="border rounded-3 p-3">
                    <h6 className="fw-bold mb-2">{booking.event.title}</h6>
                    <div className="row text-muted small">
                      <div className="col-6">
                        <i className="bi bi-calendar-event me-1"></i>
                        {booking.event.date}
                      </div>
                      <div className="col-6">
                        <i className="bi bi-geo-alt me-1"></i>
                        {booking.event.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-success btn-lg fw-bold py-3"
                  onClick={openCheckout}
                  style={{
                    background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(40, 167, 69, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-lock-fill me-2"></i>
                  Pay Securely ₹{booking.amount}
                </button>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Your payment is secure and encrypted
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;