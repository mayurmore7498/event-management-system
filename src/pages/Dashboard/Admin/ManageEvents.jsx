import React, { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../../../services/eventService";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../../../layout/MainLayout";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      alert(" Event deleted successfully!");
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <MainLayout>
    <div className="container-fluid">
      <h2 className="fw-bold text-primary mb-4">
        <i className="bi bi-calendar-check me-2"></i>
        Manage Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
          <h5 className="text-muted">No events found.</h5>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Organizer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={e.image}
                            alt={e.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "8px",
                              objectFit: "cover"
                            }}
                            className="me-3"
                          />
                          <div>
                            <h6 className="fw-bold mb-0">{e.title}</h6>
                            <small className="text-muted">{e.description?.slice(0, 50)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>{e.date}</td>
                      <td>{e.location}</td>
                      <td>{e.organizerName || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            e.status === "APPROVED"
                              ? "bg-success"
                              : e.status === "PENDING"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(e.id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default ManageEvents;