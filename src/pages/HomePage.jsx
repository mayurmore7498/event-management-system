import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedEvents();
  }, []);

  const fetchApprovedEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events/approved");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching approved events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";
    e.target.alt = "Default event image";
  };

  // Default event images for fallback
  const defaultEventImages = [
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  // Get a random default image
  const getDefaultImage = (eventId) => {
    const index = eventId ? eventId % defaultEventImages.length : 0;
    return defaultEventImages[index];
  };

  return (
    <div className="homepage" style={{ background: "#ffffff" }}>
      {/* Hero Banner */}
      <section
        className="text-white d-flex align-items-center justify-content-center position-relative"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "75vh",
          minHeight: "500px"
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 
                className="display-4 fw-bold mb-4"
                style={{
                  color: "#ffffff",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.3)"
                }}
              >
                Discover Amazing Events Near You
              </h1>
              <p className="lead mb-5 fs-5" style={{ 
                color: "rgba(255,255,255,0.9)",
                textShadow: "1px 1px 4px rgba(0,0,0,0.3)" 
              }}>
                Find, create, and experience unforgettable events with EventEase - Your gateway to extraordinary experiences
              </p>
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                <Link 
                  to="/explore-events" 
                  className="btn btn-lg px-5 py-3 fw-bold"
                  style={{
                    background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    fontSize: "1.1rem"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-search me-2"></i>
                  Explore Events
                </Link>
                <Link 
                  to="/organize-event" 
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-bold"
                  style={{
                    border: "2px solid #ffffff",
                    color: "#ffffff",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    fontSize: "1.1rem"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ffffff";
                    e.target.style.color = "#e43f5a";
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#ffffff";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Organize Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)" }}>
        <div className="container">
          <div className="row text-center text-white mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Why Choose EventEase?</h2>
              <p className="lead" style={{ color: "rgba(255,255,255,0.9)" }}>Experience events like never before with our premium features</p>
            </div>
          </div>
          <div className="row g-4">
            {[
              { icon: "bi-ticket-perforated", title: "Easy Booking", desc: "Quick and secure ticket booking process" },
              { icon: "bi-shield-check", title: "Secure Payments", desc: "100% secure payment gateway" },
              { icon: "bi-phone", title: "Mobile Friendly", desc: "Access events on any device" },
              { icon: "bi-headset", title: "24/7 Support", desc: "Round the clock customer support" }
            ].map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div 
                  className="text-center p-4 rounded"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                    borderRadius: "12px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  }}
                >
                  <i className={`${feature.icon} display-4 mb-3`} style={{ color: "#e43f5a" }}></i>
                  <h5 className="fw-bold mb-2 text-white">{feature.title}</h5>
                  <p className="mb-0" style={{ color: "rgba(255,255,255,0.9)" }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-between align-items-center mb-5">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-2" style={{ color: "#1a1a1a" }}>Featured Events</h2>
              <p className="text-muted fs-5">Discover the most exciting events happening around you</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link 
                to="/explore-events" 
                className="btn fw-semibold px-4 py-2"
                style={{
                  background: "transparent",
                  color: "#e43f5a",
                  border: "2px solid #e43f5a",
                  borderRadius: "8px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e43f5a";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#e43f5a";
                }}
              >
                View All Events
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading amazing events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No events available</h4>
              <p className="text-muted">Check back later for new events!</p>
            </div>
          ) : (
            <div className="row g-4">
              {events.slice(0, 6).map((event) => (
                <div key={event.id} className="col-xl-4 col-lg-6 col-md-6">
                  <div 
                    className="card border-0 shadow h-100"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={event.image || getDefaultImage(event.id)}
                        className="card-img-top"
                        alt={event.title}
                        style={{
                          height: "240px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          width: "100%"
                        }}
                        onError={handleImageError}
                        onLoad={(e) => {
                          // Image loaded successfully
                          e.target.style.opacity = "1";
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                      />
                      <div 
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          background: "rgba(0, 0, 0, 0.8)",
                          color: "white",
                          padding: "6px 16px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                          zIndex: 2
                        }}
                      >
                        ₹{event.ticketPrice || "Free"}
                      </div>
                      {/* Loading overlay for images */}
                      <div 
                        className="image-loading-overlay d-flex align-items-center justify-content-center"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(0,0,0,0.1)",
                          zIndex: 1,
                          display: "none"
                        }}
                      >
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title fw-bold mb-3" style={{ color: "#1a1a1a", minHeight: "56px" }}>
                        {event.title}
                      </h5>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-calendar-event me-2" style={{ color: "#e43f5a" }}></i>
                          <small className="text-muted">
                            {new Date(event.date).toLocaleDateString('en-IN', { 
                              weekday: 'short', 
                              day: 'numeric', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt me-2" style={{ color: "#e43f5a" }}></i>
                          <small className="text-muted">{event.location}</small>
                        </div>
                      </div>

                      <p 
                        className="card-text text-secondary mb-4 flex-grow-1"
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.5",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {event.description?.slice(0, 100)}...
                      </p>

                      <Link 
                        to={`/event/${event.id}`} 
                        className="btn w-100 py-2 fw-semibold"
                        style={{
                          background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "linear-gradient(135deg, #d42a45 0%, #c21532 100%)";
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 4px 15px rgba(228, 63, 90, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)";
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;