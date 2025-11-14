import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";   
import {
  getPendingEvents,
  approveEvent,
  rejectEvent,
} from "../../../services/eventService";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../../../layout/MainLayout";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getPendingEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      alert("Event Approved Successfully!");
      load();
    } catch (err) {
      console.error("Error approving event:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectEvent(id);
      alert(" Event Rejected!");
      load();
    } catch (err) {
      console.error("Error rejecting event:", err);
    }
  };

  return (
     <MainLayout>
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h2>
        
        <div className="d-flex gap-2">
          <Link to="/admin/manage-events" className="btn btn-primary">
            <i className="bi bi-calendar-check me-2"></i>
            Manage Events
          </Link>
          <Link to="/admin/manage-users" className="btn btn-secondary">
            <i className="bi bi-people me-2"></i>
            Manage Users
          </Link>
        </div>
      </div>

      <div 
        className="card shadow-sm border-0"
        style={{ borderRadius: "16px" }}
      >
        <div className="card-header bg-transparent border-0 py-4">
          <h5 className="fw-bold mb-0 text-dark">
            <i className="bi bi-clock-history me-2"></i>
            Pending Event Approvals
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3 text-muted">Loading pending events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-check-circle display-1 text-success mb-3"></i>
              <h5 className="text-muted">No pending events right now.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Event Details</th>
                    <th>Date & Location</th>
                    <th>Organizer</th>
                    <th>Capacity</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={e.image}
                            alt="event"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                            className="me-3"
                          />
                          <div>
                            <h6 className="fw-bold mb-1">{e.title}</h6>
                            <p className="text-muted small mb-0" style={{maxWidth: "200px"}}>
                              {e.description?.slice(0, 80)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="fw-semibold">
                            <i className="bi bi-calendar me-2 text-primary"></i>
                            {e.date}
                          </div>
                          <small className="text-muted">
                            <i className="bi bi-geo-alt me-2"></i>
                            {e.location}
                          </small>
                        </div>
                      </td>
                      <td>{e.organizerName || "N/A"}</td>
                      <td>
                        <span className="badge bg-info">{e.capacity}</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleApprove(e.id)}
                          >
                            <i className="bi bi-check-lg me-1"></i>
                            Approve
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReject(e.id)}
                          >
                            <i className="bi bi-x-lg me-1"></i>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default AdminDashboard;