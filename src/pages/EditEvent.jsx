import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditEvent = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    ticketPrice: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error loading event:", error);
      alert("Failed to load event details");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put(`http://localhost:8080/api/events/update/${id}`, formData);
      alert("Event Updated Successfully!");
      navigate("/organizer/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

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
                <i className="bi bi-pencil-square me-2"></i>
                Edit Event
              </h3>
              <p className="mb-0 opacity-75">Update your event details</p>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Event Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Ticket Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="ticketPrice"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ borderRadius: "8px" }}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Event Image</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    name="image" 
                    onChange={handleChange}
                    accept="image/*"
                    style={{ borderRadius: "8px" }}
                  />
                  <div className="form-text">
                    Upload a new image or keep the current one
                  </div>
                </div>

                {formData.image && (
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Image Preview</label>
                    <div>
                      <img
                        src={formData.image}
                        alt="preview"
                        style={{ 
                          width: "200px", 
                          height: "150px", 
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #e9ecef"
                        }}
                        className="shadow-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex gap-3">
                  <button 
                    type="submit" 
                    className="btn fw-semibold px-4 py-2"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px"
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary fw-semibold px-4 py-2"
                    onClick={() => navigate("/organizer/dashboard")}
                    style={{ borderRadius: "8px" }}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;