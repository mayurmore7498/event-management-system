import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrganizeEvent = () => {
  const [events, setEvents] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    ticketPrice: "",
    image: "",
    organizerId: localStorage.getItem("id"),
  });

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/events/organizer/${localStorage.getItem("id")}`
      );
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreview(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSend = {
        ...formData,
        organizerId: localStorage.getItem("id"),
      };

      await axios.post("http://localhost:8080/api/events/create", dataToSend);

      alert("Event submitted successfully! Waiting for admin approval.");
      setPreview(null);

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
        ticketPrice: "",
        image: "",
        organizerId: localStorage.getItem("id"),
      });

      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          <i className="bi bi-plus-circle me-2"></i>
          Organize Event
        </h2>
        <p className="text-muted fs-5">Create and manage your events effortlessly</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-5">
            <div className="card-header bg-transparent border-0 py-4">
              <h5 className="fw-bold text-dark mb-0">Create New Event</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handlePreview}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      className="form-control"
                      value={formData.capacity}
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Ticket Price (₹)</label>
                    <input
                      type="number"
                      name="ticketPrice"
                      className="form-control"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Event Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-12 text-end">
                    <button 
                      className="btn btn-primary px-4 py-2 fw-semibold"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="bi bi-eye me-2"></i>
                      Preview Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card shadow-sm border-primary border-2">
              <div className="card-header bg-primary text-white py-3">
                <h5 className="fw-bold mb-0">
                  <i className="bi bi-eye me-2"></i>
                  Event Preview
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-5">
                    {preview.image ? (
                      <img
                        src={preview.image}
                        alt="Preview"
                        className="img-fluid rounded-3"
                        style={{ height: "250px", objectFit: "cover", width: "100%" }}
                      />
                    ) : (
                      <div 
                        className="bg-secondary text-white text-center rounded-3 d-flex justify-content-center align-items-center"
                        style={{ height: "250px" }}
                      >
                        <div>
                          <i className="bi bi-image display-4 mb-2"></i>
                          <p className="mb-0">No Image Uploaded</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <h4 className="fw-bold text-primary">{preview.title}</h4>
                    <p className="text-muted mb-3">{preview.description}</p>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt text-primary me-2"></i>
                        <span>{preview.location}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-event text-primary me-2"></i>
                        <span>{preview.date}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-people text-primary me-2"></i>
                        <span>Capacity: {preview.capacity || "Not specified"}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-currency-rupee text-primary me-2"></i>
                        <span>Price: ₹{preview.ticketPrice || "Free"}</span>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <button 
                        onClick={handleSubmit} 
                        className="btn btn-success fw-semibold"
                        disabled={loading}
                        style={{ borderRadius: "8px" }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Submit for Approval
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => setPreview(null)} 
                        className="btn btn-outline-secondary fw-semibold"
                        style={{ borderRadius: "8px" }}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <h4 className="fw-bold text-primary mb-4">
            <i className="bi bi-list-ul me-2"></i>
            My Events ({events.length})
          </h4>

          {events.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
              <h5 className="text-muted">No events created yet</h5>
              <p className="text-muted">Start by creating your first event above!</p>
            </div>
          ) : (
            <div className="row g-4">
              {events.map((event) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={event.id}>
                  <div className="card shadow-sm border-0 h-100">
                    {event.image && (
                      <img
                        src={event.image}
                        className="card-img-top"
                        alt={event.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h6 className="card-title fw-bold">{event.title}</h6>
                      <p className="text-muted small mb-2">
                        <i className="bi bi-calendar-event me-1"></i>
                        {event.date}
                      </p>
                      <p className="text-muted small mb-2">
                        <i className="bi bi-currency-rupee me-1"></i>
                        ₹{event.ticketPrice}
                      </p>
                      <span className={`badge ${
                        event.status === "PENDING"
                          ? "bg-warning text-dark"
                          : event.status === "APPROVED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizeEvent;